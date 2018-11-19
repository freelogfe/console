import { onloadSchemesForResource } from '@/data/scheme/loader'
import PolicyEditor from '@/components/policyEditor/index.vue'
import { beautify } from '@freelog/resource-policy-lang'
import { SCHEME_STATUS } from '@/config/scheme'
import ResourceIntroInfo from '../../intro/index.vue'
import SchemeDetail from '../../detail/auth-scheme/index.vue'


const schemesCacheMap = {}
export default {
  name: 'resource-scheme-opts',
  components: {
    PolicyEditor,
    SchemeDetail,
    ResourceIntroInfo
  },
  props: {
    updateCallback: {
      type: Function
    },
    node: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      schemes: [],
      selectedAuthSchemeId: '',
      isResolved: null,
      resource: null
    }
  },
  mounted() {
    this.initView()

    this.$on('hideArrowLine', this.hideLineArrow.bind(this))
  },
  computed: {},
  methods: {
    initView() {
      this.resource = this.node.resource
      this.isResolved = this.resource.isResolved

      if (this.resource.selectedScheme) {
        this.selectedAuthSchemeId = this.resource.selectedScheme.authSchemeId
      }
      this.loadSchemes(this.resource.resourceId)
        .then((schemes) => {
          this.schemes = schemes
          this.showNextNode(schemes[this.resource.activeIndex])
        })
    },
    loadSchemes(resourceId) {
      if (schemesCacheMap[resourceId]) {
        return Promise.resolve(schemesCacheMap[resourceId])
      }
      return onloadSchemesForResource(resourceId).then((schemes) => {
        schemesCacheMap[resourceId] = this.formatSchemes(schemes)
        return schemes
      })
    },
    formatSchemes(schemes) {
      schemes.forEach((scheme) => {
        scheme.bubbleResources.forEach((res) => {
          res.activeStatus = SCHEME_STATUS.UNHANDLE
          res._id = `${scheme.authSchemeId}_${res.resourceId}`
        })

        scheme.activeResource = null
        if (scheme.authSchemeId === this.selectedAuthSchemeId) {
          scheme.selectedPolicySegmentId = this.resource.selectedPolicy.segmentId
        } else {
          scheme.selectedPolicySegmentId = ''
        }
      })
      return schemes
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
    switchSchemeHandler(scheme, index) {
      this.resource.activeIndex = index
      this.activeScheme = scheme
      this.$emit('changeScheme', this.node)
      this.hideLineArrow()

      this.showNextNode(scheme)
      this.$forceUpdate()
    },
    showNextNode(scheme) {
      if (scheme && scheme.activeResource) {
        this.$emit('next', {
          resource: scheme.activeResource,
          node: this.node
        })
        this.$nextTick(() => {
          this.showLineArrow(this.$el.querySelector(`.js-res-${scheme.activeResource._id}`))
        })
      }
    },
    toggleResolveResource() {
      const resource = this.resource
      let isResolved = this.isResolved
      isResolved = (isResolved === null) ? false : !isResolved

      this.isResolved = isResolved
      if (isResolved === false) {
        resource.activeStatus = SCHEME_STATUS.NONE
        this.hideLineArrow()
        // selectedScheme.authSchemeId && this.selectAuthSchemeHandler(selectedScheme, index)
      } else {
        this.updateResourceActiveStatus()
      }

      this.$emit('resolve', {
        isResolved,
        ...this.node
      })
    },
    updateResourceActiveStatus() {

    },
    changeResourceHandler(dep, scheme, ev) {
      this.$emit('next', {
        resource: dep,
        node: this.node
      })
      scheme.activeResource = dep
      this.showLineArrow(ev.currentTarget)
    },
    changePolicyHandler(scheme, policy) {
      if (scheme.selectedPolicySegmentId) {
        this.resource.selectedPolicy = { ...policy }
      }
    },
    changeSchemePolicyHandler(scheme) {
      if (scheme.selectedPolicySegmentId) {
        this.resource.selectedPolicy = null
        scheme.selectedPolicySegmentId = ''
        this.resetSelectedScheme()
      }
    },
    checkResourceCancelable() {
      const deps = this.resource.selectedScheme.bubbleResources
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
    checkResourceSelectable() {
      // '未选择前一级资源策略不可选当前资源的策略'
      return Promise.resolve()
    },
    resetSelectedScheme() {
      this.resource.selectedScheme = null
      this.selected = false
      this.selectedAuthSchemeId = ''
    },
    setSelectedScheme(scheme) {
      const selectedAuthSchemeId = this.selectedAuthSchemeId

      // 如果已经选择过且与本次选择不同，则需要覆盖
      if (selectedAuthSchemeId && selectedAuthSchemeId !== scheme.authSchemeId) {
        this.resetSelectedScheme()
      }

      this.selected = true
      this.resource.selectedScheme = scheme
      this.selectedAuthSchemeId = scheme.authSchemeId
    },
    selectAuthSchemeHandler(scheme) {
      if (this.selectedAuthSchemeId === scheme.authSchemeId) {
        this.checkResourceCancelable()
          .then(() => {
            this.resetSelectedScheme(scheme)
            this._fireSelected()
          })
          .catch(() => {
          })
      } else {
        this.checkResourceSelectable().then(() => {
          if (!scheme.selectedPolicySegmentId) {
            Promise.reject(new Error('未选择授权方案策略'))
          } else {
            this.setSelectedScheme(scheme)
            this._fireSelected()
          }
        }).catch((msg) => {
          this.$message.warning(msg)
        })
      }
    },
    _fireSelected() {
      this.$emit('select', this.resource)
    },
    hideLineArrow() {
      this.$refs.lineArrow.style.display = 'none'
    },
    showLineArrow(from) {
      const target = this.$refs.lineArrow
      this.$refs.lineArrow.style.display = 'block'
      this.computeLineArrow(target, from)
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
  }
}
