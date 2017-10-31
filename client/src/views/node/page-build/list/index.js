import TableView from '@/components/TableView/index.vue'

export default {
  name: 'node-page-build-list',
  data() {
    return {
      resourceList: []
    }
  },
  components: {
    TableView
  },

  mounted() {
  },
  methods: {
    loader() {
      const self = this;
      return () => {
        var param = {
          nodeId: this.$route.params.nodeId
        };
        return this.$services.pagebuild.get({
          params: param
        }).then((res) => {
          var presentables = res.getData()
          var promises = []
          presentables.forEach((p) => {
            var promise = self.$services.resource.get(p.resourceId).then((resourceRes) => {
              p.resourceDetail = resourceRes.getData()
              return resourceRes
            })
            promises.push(promise)
          })

          return Promise.all(promises).then((resources) => {
            return res
          })
        })
      }
    },
    setDefaultPageBuildHandler(presentable, status) {
      this.$services.pagebuild.post({
        nodeId: this.$route.params.nodeId,
        status: status || 1,
        presentableId: presentable.presentableId
      }).then((res) => {
        this.$message.success('设置成功')
      }).catch((res) => {
        this.$message.error(res.response.errorMsg)
      })
    },
    handlePreview(presentable) {
      this.$router.push({
        path: `/node/${this.$route.params.nodeId}/resource/detail`,
        query: {presentableId: presentable.presentableId}
      })
    }
  }
}
