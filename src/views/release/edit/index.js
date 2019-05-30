import ReleaseEditorLayout from './layout.vue'
import ReleaseEditorContract from '@/views/release/contract/index.vue'
import LazyListView from '@/components/LazyListView/index.vue'

import SchemeManage from '../scheme/index.vue'
import { format } from 'date-fns'

export default {
  name: 'release-detail',
  components: {
    ReleaseEditorLayout, SchemeManage, ReleaseEditorContract, LazyListView
  },
  data() {
    return {
      release: null,
      targetResourceId: '',
      targetResourceDetail: null,
      vTabActiveName: 'scheme',
      selectedVersion: '',
      isVersionSelectorVisible: false,
      resourceDialogVisible: false,
      contracts: [],
      depReleasesList: [],
      depReleasesDetailList: [],
      releasesTreeData: [],
      searchInput: '',
      searchResources: [],
    }
  },
  computed: {
    releaseId() {
      return this.$route.params.releaseId
    },
    resourceProjection() {
      return ['resourceId', 'resourceType', 'aliasName', 'createDate', 'status'].join(',')
    },
  },
  watch: {
    targetResourceId() {
      this.fetchResourceDetail()
    },
  },
  methods: {
    fetchResourceDetail() {
      this.$services.resource.get(this.targetResourceId)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0) {
            this.targetResourceDetail = res.data
            this.depReleasesList = this.targetResourceDetail ? this.targetResourceDetail.systemMeta.dependencies : []
          }else {
            this.$message({ type: 'error', message: res.msg })
          }
        })
        .catch(e => this.$message({ type: 'error', message: e.toString() }))
    },
    fetchReleaseDetail() {
      this.$services.ReleaseService.get(this.releaseId)
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0) {
            this.release = res.data
            const { resourceId, version } = this.release.latestVersion
            this.selectedVersion = this.release.selectedVersion = version
            this.targetResourceId = resourceId
            this.targetResourceDetail = res.data.resourceInfo
            // this.depReleasesList = this.targetResourceDetail ? this.targetResourceDetail.systemMeta.dependencies : []
            this.formatReleaseData()
            this.fetchEveryVersionRDetail()
          }
        })
    },
    formatReleaseData() {
      this.release.resourceVersions = this.release.resourceVersions.map(i => {
        i.createDate = format(i.createDate, 'YYYY-MM-DD')
        return i
      })
    },
    fetchEveryVersionRDetail() {
      this.$services.resource.get('list', {
        params: {
          resourceIds: this.release.resourceVersions.map(r => r.resourceId).join(','),
          projection: 'aliasName,resourceId,resourceType,createDate,intro',
        }
      })
        .then(res => res.data)
        .then(res => {
          if(res.errcode === 0) {
            const map = {}
            res.data = res.data.forEach(resource => map[resource.resourceId] = resource)
            this.release.resourceVersions = this.release.resourceVersions.map(resource => {
              resource = Object.assign(resource, map[resource.resourceId])
              resource.createDate = format(resource.createDate, 'YYYY-MM-DD')
              return resource
            })
          }else {
            this.$message({ type: 'error', message: res.msg })
          }
        })
        .catch(e => this.$message({ type: 'error', message: e.toString() }))
    },
    // 切换 发行版本
    exchangeVersion(item) {
      this.targetResourceId = item.resourceId
      this.selectedVersion = item.version
      this.release.selectedVersion = item.version
    },
    exchangeVTab(tab) {
      this.vTabActiveName = tab.name
    },
    showResourceDialog() {
      this.resourceDialogVisible = true

      // if(this.release.policies.length > 0) {
      //   this.resourceDialogVisible = true
      // }else {
      //   this.$message({ type: 'warning', message: '发行没策略，不能新增版本' })
      // }
    },
    clearSearchInputHandler() {

    },
    // 资源搜索
    searchDataHandler(page) {
      const pageSize = 10

      // if (!this.searchInput) {
      //   return Promise.resolve({ canLoadMore: false })
      // }
      // 空输入时，即查询所有属于我的资源
      return this.$services.ResourceService.get({
        params: Object.assign({
          keywords: encodeURIComponent(this.searchInput),
          page,
          pageSize,
          isSelf: 1,
          projection: this.resourceProjection
        }, this.searchScope)
      }).then((res) => {
        const data = res.getData() || {}
        if (res.data.errcode === 0) {
          this.searchResources = this.searchResources.concat(data.dataList)
          if (data.dataList.length < pageSize) {
            data.canLoadMore = false
          }
        } else {
          data.canLoadMore = false
        }
        return data
      })
    },
    searchHandler() {
      this.activeName = 'search'
      this.searchResources = []
      this.$refs.searchView.refresh()
    },
    addNewVersion(resource) {
      if(resource.resourceType === this.release.resourceType) {
        const rVersions = this.release.resourceVersions
        for(let i = 0; i < rVersions.length; i++) {
          if(rVersions[i].resourceId === resource.resourceId) {
            this.$message({
              type: 'warning',
              message: `不可用：所选资源与该发行版本${rVersions[i].version}的资源相同`,
              duration: 5000
            })
            return
          }
        }

        this.$router.push(`/release/add?releaseId=${this.release.releaseId}&resourceId=${resource.resourceId}`)
      }else {
        this.$message({ type: 'warning', message: `所选资源的类型必须为${resource.resourceType}`, duration: 5000 })
      }
    },
  },
  created() {
    this.fetchReleaseDetail()
  }
}
