import { intersectionBy, unionBy, differenceBy } from 'lodash'
import { loadAuthSchemes, onloadSchemesForResource } from '@/data/scheme/loader'
import { onloadResourceDetail } from '@/data/resource/loader'
import PolicyEditor from '@/components/PolicyEditor/index.vue'
import { beautify } from '@freelog/resource-policy-lang'
import { SCHEME_STATUS, SCHEME_PUBLISH_STATUS } from '@/config/scheme'
import { POLICY_STATUS } from '@/config/policy'
import ResourceIntroInfo from '../intro/index.vue'
import SchemeDetail from '../detail/auth-scheme/index.vue'


export default {
  name: 'resource-scheme-tree',
  components: {
    PolicyEditor,
    SchemeDetail,
    ResourceIntroInfo
  },
  props: {
    updateCallback: {
      type: Function
    },
    detail: {
      type: Object,
      default() {
        return {
          dependencies: []
        }
      }
    },
    resourceId: {
      type: String,
      default() {
        return ''
      }
    },
    resource: {
      type: Object,
      default() {
        return {}
      }
    },
    contracts: {
      type: Array,
      default() {
        return []
      }
    },
    bubbleResources: {
      type: Array,
      default() {
        return []
      }
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    const isNodeDetail = !!this.$route.params.nodeId
    return {
      isNodeDetail,
      schemes: [],
      dutyStatements: [],
      // bubbleResources: [],
      viewMode: isNodeDetail ? 'tree' : 'list', // tree or list
      currentAuthNodeIndex: -1,
      dutyResourceMap: {},
      resourcesMap: {},
      resourceSchemesCache: {},
      parentResource: null
    }
  },
  mounted() {
    this.initView()
      .then(this.fillDutyStatements.bind(this))
      .then(() => {
        this.changeViewMode(this.viewMode)
      })
  },
  computed: {
    unsignPolicyList() {
      return this.dutyStatements.filter(duty => !duty.contractId)
    }
  },
  watch: {
    resourceId(newResId, oldResId) {
      if (oldResId) {
        if (!this.resourceSchemesCache[oldResId]) {
          this.resourceSchemesCache[oldResId] = {
            schemes: this.schemes
          }
        } else {
          this.resourceSchemesCache[oldResId].schemes = this.schemes
        }
      }

      this.initView()
      this.changeViewMode('tree')
    },
    resource(newRes, oldRes) {
      if (newRes && oldRes && (newRes.resourceId === oldRes.resourceId)) {
        return
      }
      if (oldRes && oldRes.resourceId) {
        if (!this.resourceSchemesCache[oldRes.resourceId]) {
          this.resourceSchemesCache[oldRes.resourceId] = {
            schemes: this.schemes
          }
        } else {
          this.resourceSchemesCache[oldRes.resourceId].schemes = this.schemes
        }
      }

      if (newRes.resourceId) {
        this.parentResource = newRes
      } else {
        this.parentResource = {}
      }
      this.initView()
        .then(this.fillDutyStatements.bind(this))
        .then(() => {
          this.changeViewMode('tree')
        }).catch((err) => {
          this.schemes = []
          this.$error.showErrorMessage(err)
        })
    }
  },
  methods: {
    fillDutyStatements() {
      this.schemes.forEach((dep) => {
        this.onSetResourceDetail(dep)
        this.haveSelectedScheme(dep)
        this.checkResourceActiveStatus(dep)
        return dep.resourceId
      })

      this.$forceUpdate()
    },
    initView() {
      const resourceId = this.resourceId || this.resource.resourceId

      if (!resourceId) {
        this.schemes = []
        return Promise.resolve()
      }

      const resourceSchemesCache = this.resourceSchemesCache
      const resourceCache = resourceSchemesCache[resourceId]

      this.dutyStatements = this.contracts
      this.contracts.forEach((contract) => {
        const rid = contract.resourceId
        this.dutyResourceMap[rid] = contract
      })

      if (resourceCache && resourceCache.schemes) {
        this.schemes = []
        this.pushSchemeDep(resourceCache.resource)
        return Promise.resolve()
      }
      let promise
      if (this.resource && this.resource.resourceId) {
        promise = Promise.all([
          this.loadSchemesForResource(resourceId)
        ]).then((res) => {
          const resource = this.resource
          resource.schemes = this.formatSchemes(res[0])
          return resource
        })
      } else {
        promise = Promise.all([
          onloadResourceDetail(resourceId),
          this.loadSchemesForResource(resourceId)
        ]).then((res) => {
          const resource = res[0]
          resource.schemes = this.formatSchemes(res[1])
          return resource
        })
      }
      return promise.then((resource) => {
        resource.activeIndex = 0
        this.resourceSchemesCache[resourceId] = {
          resource
        }
        this.schemes = []
        this.pushSchemeDep(resource)
      })
    },
    loadSchemesForResource(resourceId) {
      return onloadSchemesForResource(resourceId, {
        // authSchemeStatus: 1,
        policyStatus: 2
      }).then((schemes) => {
        const authSchemeIds = schemes.map(scheme => scheme.authSchemeId)

        if (!authSchemeIds.length) {
          return schemes
        }
        const params = {
          authSchemeIds: authSchemeIds.join(',')
        }

        if (this.$route.params.nodeId) {
          params.nodeId = this.$route.params.nodeId
        }

        return this.$axios.get('/v1/auths/authSchemeIdentityAuth', {
          params
        }).then((res) => {
          const list = res.getData()
          const authsMap = {}
          const duty = this.dutyResourceMap[resourceId]
          list.forEach((schemeAuths) => {
            schemeAuths.policy.forEach((auth) => {
              authsMap[`${schemeAuths.authSchemeId}_${auth.segmentId}`] = (auth.authResult && auth.authResult.isAuth)
            })
          })

          schemes = schemes.filter((scheme) => {
            // 只展示已发布的和已选择的
            const isPublished = scheme.status === SCHEME_PUBLISH_STATUS.PUBLISHED
            const isSelected = (duty && duty.authSchemeId === scheme.authSchemeId)
            if (!isPublished && !isSelected) {
              return false
            }

            scheme.policy = scheme.policy.filter((p) => {
              if ((isPublished && p.status === POLICY_STATUS.show) || (duty && duty.policySegmentId === p.segmentId)) {
                p.isAuth = !!authsMap[`${scheme.authSchemeId}_${p.segmentId}`]
                return p
              }
              return false
            })
            return scheme
          })
          return schemes
        })
      })
    },
    checkResourceActiveStatus(dep) {
      const key = 'resourceId'
      let intersectDeps = intersectionBy(this.dutyStatements, [dep], key)
      let activeStatus
      if (intersectDeps.length) {
        const allResources = unionBy(this.bubbleResources, this.dutyStatements, key)
        intersectDeps = intersectionBy(allResources, dep.dependenciesTree, key)
        intersectDeps = differenceBy(intersectDeps, this.dutyStatements, key)
        if (intersectDeps.length) {
          activeStatus = SCHEME_STATUS.SOME
        } else {
          activeStatus = SCHEME_STATUS.ALL
        }

        dep.activeStatus = activeStatus
        if (dep.selectedScheme && dep.selectedScheme.authSchemeId) {
          dep.selectedScheme.dependencies.forEach((res) => {
            this.checkResourceActiveStatus(res)
          })
        }
      } else {
        intersectDeps = intersectionBy(this.bubbleResources, [dep], key)
        if (intersectDeps.length) {
          dep.isResolved = false
        } else {
          dep.activeStatus = SCHEME_STATUS.UNHANDLE
        }
      }
    },
    formatPolicyText(policyText) {
      let fmtText
      try {
        fmtText = beautify(policyText)
      } catch (err) {
        fmtText = policyText
      }
      return fmtText
    },
    changeViewMode(mode) {
      this.viewMode = mode

      this.$emit('changeMode', mode)
      if (mode === 'list') {
        this.hideLineArrow(this.$el)
        this.showUnSignedPolicyList()
      } else {
        this.showLineArrows()
      }
    },
    showUnSignedPolicyList() {
      const rids = []
      const schemeRids = []

      this.dutyStatements.forEach((duty) => {
        rids.push(duty.resourceId)
        this.onSetResourceDetail(duty)
        if (!duty.selectedScheme) {
          schemeRids.push(duty.resourceId)
        }
      })

      if (schemeRids.length) {
        loadAuthSchemes({
          resourceIds: schemeRids,
          authSchemeStatus: 1,
          policyStatus: 1
        }).then((schemes) => {
          const resources = []
          schemes.forEach((scheme) => {
            const resource = this.resourcesMap[scheme.resourceId]
            if (resource.schemes) {
              resource.schemes.push(scheme)
            } else {
              resource.schemes = [scheme]
              resources.push(resource)
            }
          })

          resources.forEach((res) => {
            this.resolveResourceSchemes(res)
            this.haveSelectedScheme(res)
          })
        }).then(() => {
          this.$nextTick(() => {
            this.$forceUpdate()
          })
        })
      }
    },
    showPublishEditErrorTip() {
      this.$message.warning('已发布授权点，当前操作不可执行')
    },
    changePolicy(resource, scheme, policy) {
      if (scheme.selectedPolicySegmentId) {
        scheme.selectedPolicy = { ...policy }
      }

      this.$forceUpdate()
    },
    // resource, scheme, policy
    resetSchemePolicyHandler(resource, scheme) {
      if (scheme.selectedPolicy.segmentId && scheme.selectedPolicySegmentId) {
        scheme.selectedPolicy = {}
        scheme.selectedPolicySegmentId = ''
        this.resetSelectedScheme(resource)
      }
      this.$forceUpdate()
    },
    computeLineArrow(target, _from) {
      this.$nextTick(() => {
        const fromRect = _from.getBoundingClientRect()

        target.style.top = `${_from.offsetTop + 10}px`
        target.style.left = `${_from.offsetLeft + fromRect.width + 5}px`
        target.style.right = '-10px'
        target.style.display = 'block'
      })
    },
    // 默认取消后续的授权方案
    cancelBackSchemes(resource) {
      const dependencies = resource.selectedScheme && resource.selectedScheme.dependencies
      if (dependencies && dependencies.length) {
        dependencies.forEach((dep) => {
          if (dep.selectedScheme) {
            this.resetSelectedScheme(dep)
          }
        })
      }
    },
    prevResourcesHandler(res, fn) {
      const resources = this.schemes
      let start = false
      for (let i = resources.length - 1; i >= 0; i -= 1) {
        const tmpRes = resources[i]
        if (res.resourceId === tmpRes.resourceId) {
          start = true
        }

        if (start && fn(tmpRes)) {
          break
        }
      }
    },
    // 默认选中前置的授权方案
    selectPrevSchemes(curRes) {
      this.prevResourcesHandler(curRes, (res) => {
        this.setSelectedScheme(res)
      })
    },
    deleteFromDutyStateMents(resource) {
      const dutyStatements = this.dutyStatements

      if (this.dutyResourceMap[resource.resourceId]) {
        delete this.dutyResourceMap[resource.resourceId]
      }
      for (let i = 0; i < dutyStatements.length; i += 1) {
        const duty = dutyStatements[i]
        if (duty.resourceId === resource.resourceId) {
          dutyStatements.splice(i, 1)
          break
        }
      }
    },
    resetSelectedScheme(resource) {
      this.deleteFromDutyStateMents(resource)
      this.cancelBackSchemes(resource)
      resource.selectedScheme = {}
      resource.selected = false

      this.updateResourceActiveStatus(resource)
    },
    setSelectedScheme(resource, scheme) {
      // var scheme = resource.activeScheme
      const selectedScheme = resource.selectedScheme

      // 如果已经选择过且与本次选择不同，则需要覆盖
      if (selectedScheme && selectedScheme.authSchemeId &&
        (selectedScheme.authSchemeId !== scheme.authSchemeId)) {
        this.resetSelectedScheme(resource)
      }

      if (scheme.selectedPolicy) {
        scheme.selectedPolicySegmentId = scheme.selectedPolicy.segmentId
      }

      this.dutyResourceMap[resource.resourceId] = resource
      resource.selected = true
      resource.selectedScheme = scheme
      this.dutyStatements.push(resource)
      this.updateResourceActiveStatus(resource)
    },
    updateResourceActiveStatus(resource) {
      let activeStatus

      if (!resource.selectedScheme || !resource.selectedScheme.authSchemeId) {
        activeStatus = resource.isResolved === false ? SCHEME_STATUS.NONE : SCHEME_STATUS.UNHANDLE
      } else {
        const bubbleResources = resource.selectedScheme.bubbleResources
        if (bubbleResources.length) {
          let cnt = 0
          activeStatus = SCHEME_STATUS.SOME
          bubbleResources.forEach((res) => {
            const duty = this.dutyResourceMap[res.resourceId]
            const dutyRes = duty && this.resourcesMap[duty.resourceId]
            if (duty && (dutyRes.activeStatus === SCHEME_STATUS.ALL)) {
              cnt += 1
            }
          })
          if (cnt === bubbleResources.length) {
            activeStatus = SCHEME_STATUS.ALL
          }
        } else {
          activeStatus = SCHEME_STATUS.ALL
        }
      }
      resource.activeStatus = activeStatus
      if (this.parentResource && this.parentResource.resourceId === resource.resourceId) {
        this.$emit('updateResource', resource)
      }

      this.$forceUpdate()
    },
    updatePrevSchemesActiveStatus(resource) {
      this.prevResourcesHandler(resource, (res) => {
        this.updateResourceActiveStatus(res)
      })
    },
    checkResourceSelectable(index) {
      const prev = index - 1
      if (prev >= 0) {
        const prevResource = this.schemes[prev]
        return prevResource.selected
      }
      return true
    },
    checkResourceCancelable(resource) {
      const deps = resource.selectedScheme.dependencies
      const selectedDeps = []

      deps.forEach((dep) => {
        if (dep.selected || dep.activeStatus === SCHEME_STATUS.ALL || dep.activeStatus === SCHEME_STATUS.SOME) {
          selectedDeps.push(dep)
        }
      })

      if (!selectedDeps.length) {
        return Promise.resolve()
      }
      // const msg = selectedDeps.map(dep => dep.resourceName).join('、')
      return this.$confirm('取消当前资源的选择会导致后续资源选择的策略都取消，确定吗？', {})
    },
    selectAuthSchemeHandler(resource, scheme, panelIndex) {
      if (this.config.isPublished) {
        this.showPublishEditErrorTip()
      } else if (resource.selectedScheme &&
        resource.selectedScheme.authSchemeId === scheme.authSchemeId) {
        this.checkResourceCancelable(resource)
          .then(() => {
            if (this.schemes[0].resourceId === scheme.resourceId) {
              this.schemes[0].checked = false
            }
            this.resetSelectedScheme(resource)
            this.updatePrevSchemesActiveStatus(resource)
            this._fireUpdateHandler()
          })
          .catch(() => {
          })
      } else if (!this.checkResourceSelectable(panelIndex)) {
        this.$message.warning('未选择前一级资源策略不可选当前资源的策略')
      } else if (!scheme.selectedPolicySegmentId) {
        this.$message.warning('未选择当前授权方案的策略')
      } else {
        this.setSelectedScheme(resource, scheme)
        this.updatePrevSchemesActiveStatus(resource)
        // this.selectPrevSchemes(resource)
        this._fireUpdateHandler()
      }
    },
    _fireUpdateHandler() {
      const data = this.dutyStatements
      if (typeof this.updateCallback === 'function') {
        this.updateCallback(data)
      }

      this.$emit('update', data)
    },
    getParent(el, selector) {
      if (!selector) {
        return el.parentNode
      }
      let target = el.parentNode
      const isId = selector[0] === '#'
      selector = selector.substr(1)
      while (!((isId && target.id === selector) || (!isId && target.className.indexOf(selector) > -1)) && target !== document.body) {
        target = target.parentNode
      }

      return target
    },
    selectResourceHandler(dep, scheme, index) {
      scheme.activeResource = dep
      this.updateSchemeList(index)
      this.pushSchemeDep(dep)
      this.drawLineArrow(scheme)
    },
    updateSchemeList(index) {
      index += 1
      const len = this.schemes.length
      const diff = len - index
      this.currentAuthNodeIndex = index
      if (diff > 0) {
        for (let i = 0; i < diff; i += 1) {
          this.schemes.pop()
        }
      }
    },
    haveSelectedScheme(dep) {
      const duty = this.dutyResourceMap[dep.resourceId]
      if (duty) {
        for (let i = 0, len = dep.schemes.length; i < len; i += 1) {
          const scheme = dep.schemes[i]
          if (scheme.authSchemeId === duty.authSchemeId ||
            (duty.selectedScheme && scheme.authSchemeId === duty.selectedScheme.authSchemeId)) {
            dep.activeScheme = scheme
            dep.activeIndex = i
            dep.selectedScheme = scheme
            dep.selected = true
            Object.assign(duty, dep)
            scheme.selectedPolicySegmentId = duty.selectedScheme.selectedPolicySegmentId || duty.policySegmentId
            for (let j = 0; j < scheme.policy.length; j += 1) {
              if (scheme.policy[j].segmentId === duty.policySegmentId) {
                scheme.selectedPolicy = scheme.policy[j]
                scheme.policy[j].selected = true
              }
            }
            break
          }
        }
        return true
      }
      dep.selectedScheme = {}
      dep.selected = false
      return false
    },
    loadResourceSchemes(dep) {
      if (dep.schemes) {
        return Promise.resolve(dep)
      }
      dep.schemes = []
      // 获取已发布的授权点列表 {authSchemeStatus: 1}
      return this.loadSchemesForResource(dep.resourceId).then((schemes) => {
        dep.schemes = schemes
        return this.resolveResourceSchemes(dep)
      })
    },
    resolveResourceSchemes(dep) {
      this.formatSchemes(dep.schemes)
      if (!this.haveSelectedScheme(dep)) {
        dep.activeScheme = dep.schemes[0]
      }
      this.checkResourceActiveStatus(dep)
      return dep
    },
    pushSchemeDep(dep) {
      if (!this.resourcesMap[dep.resourceId]) {
        this.onSetResourceDetail(dep)
      }

      if (!dep.schemes) {
        this.loadResourceSchemes(dep).then(() => {
          this.$forceUpdate()
        })
      } else if (dep.activeStatus === undefined) {
        this.checkResourceActiveStatus(dep)
        if (!dep.activeScheme && dep.schemes.length) {
          dep.activeScheme = dep.schemes[0]
        }
      }

      if (!dep.activeScheme && !this.haveSelectedScheme(dep)) {
        dep.activeIndex = 0
        dep.activeScheme = dep.schemes[0]
      }

      this.schemes.push(dep)
      if (dep.activeScheme && dep.activeScheme.activeResource) {
        this.revertDependencyPanels(dep)
      }
    },
    onSetResourceDetail(dep) {
      const rid = dep.resourceId
      const resource = this.resourcesMap[rid]
      if (!resource) {
        this.resourcesMap[rid] = dep
      }

      if (!dep.resourceInfo) {
        onloadResourceDetail(rid).then((detail) => {
          this.$set(dep, 'resourceInfo', detail)
        })
      }
    },
    revertDependencyPanels(dep) {
      let activeScheme = dep.activeScheme
      if (!activeScheme) {
        return
      }
      let next = activeScheme.activeResource
      const schemeList = []
      schemeList.push(activeScheme)
      while (next) {
        this.currentAuthNodeIndex += 1
        this.schemes.push(next)
        activeScheme = next.activeScheme
        next = activeScheme && activeScheme.activeResource
        if (next) {
          schemeList.push(activeScheme)
        }
      }

      this.$nextTick(() => {
        schemeList.forEach((scheme) => {
          this.drawLineArrow(scheme)
        })
      })
    },
    drawLineArrow(scheme) {
      const target = this.$el.querySelector(`.js-line-${scheme.authSchemeId}`)
      const $parent = this.getParent(target, '.scheme-detail-panel')
      this.computeLineArrow(target, $parent.querySelector(`.js-res-${scheme.activeResource.resourceId}`))
    },
    formatSchemes(schemes) {
      const resourcesMap = this.resourcesMap
      schemes.forEach((scheme) => {
        const rids = []
        scheme.dependencies = scheme.bubbleResources.map((res) => {
          const resourceId = res.resourceId
          if (resourcesMap[resourceId]) {
            return resourcesMap[resourceId]
          }
          this.onSetResourceDetail(res)
          rids.push(res.resourceId)
          return res
        })

        if (scheme.selectedPolicySegmentId === undefined) {
          scheme.selectedPolicy = {}
          scheme.selectedPolicySegmentId = ''
        }
      })
      return schemes
    },
    hideLineArrow($el) {
      const $lines = $el.querySelectorAll('.line-arrow')
      $lines.forEach(($line) => {
        $line.style.display = 'none'
      })
    },
    showLineArrows() {
      const resources = this.schemes.slice(0, -1)
      resources.forEach((resource) => {
        if (resource.activeScheme) {
          const $lines = this.$el.querySelectorAll(`.js-line-${resource.activeScheme.authSchemeId}`)
          $lines.forEach(($line) => {
            $line.style.display = 'block'
          })
        }
      })
    },
    switchSchemeHandler(resource, scheme, index, panelIndex) {
      resource.activeIndex = index
      resource.activeScheme = scheme

      this.updateSchemeList(panelIndex)
      if (scheme.activeResource) {
        this.pushSchemeDep(scheme.activeResource)
        this.drawLineArrow(scheme)
      }

      this.$forceUpdate()
    },
    getDutyStatements() {
      this.dutyStatements.forEach((res) => {
        const detail = this.resourcesMap[res.resourceId]
        // 更新数据
        if (detail) {
          Object.assign(res, detail)
        }
      })
      return this.dutyStatements
    },
    hideSchemeArrow(scheme) {
      const $line = this.$el.querySelector(`.js-line-${scheme.authSchemeId}`)
      $line.style.display = 'none'
    },
    toggleResolveResource(resource, index) {
      if (this.config.isPublished) {
        this.showPublishEditErrorTip()
      } else {
        if (resource.isResolved === undefined) {
          this.$set(resource, 'isResolved', false)
        } else {
          resource.isResolved = !resource.isResolved
        }

        if (resource.isResolved === false) {
          this.updateSchemeList(index)
          this.hideSchemeArrow(resource.activeScheme)
          resource.activeScheme.activeResource = null
          if (resource.selectedScheme.authSchemeId) {
            this.selectAuthSchemeHandler(resource, resource.selectedScheme, index)
          }
        }
        this.updateResourceActiveStatus(resource)
      }
    }
  }
}
