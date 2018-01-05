/**
 * 创建合同和user policy合一方案
 */
import PresentableSteps from '@/views/node/presentable/steps/index.vue'
import PresentablePolicy from '../policy/index.vue'
import CONFIG from '@/config/index'
import compiler from 'freelog_policy_compiler'

const {RESOURCE_TYPES} = CONFIG

export default {
  name: 'node-contract-creator',
  data() {
    return {
      activeName: '',
      tabList: [],
      selected: false, //是否已选中policy
      done: false //检查是否已经创建过presentable
    }
  },
  mounted() {
    if (!this.$route.query.resourceId) {
      this.$message.error('没有资源Id, 请重新选择');
    } else {
      this.init()
    }
  },
  components: {
    PresentableSteps,
    PresentablePolicy
  },
  methods: {
    init() {
      this.loadPolicyDetail()
        .then((data) => {
          this.tabList = data
          return data
        })
        .then(this.queryContractsStatus.bind(this))
    },
    segmentChangeHandler(tabData, select) {
      if (select !== undefined) {
        tabData.selected = select
      }

      tabData.checked = Number.isInteger(tabData.selected)

      this.selected = this.tabList.some((tab) => tab.checked)
    },
    //查询合同创建状态
    queryContractsStatus(data) {
      if (!data || !data.length) {
        return
      }
      let partyTwo = this.$route.params.nodeId
      var resourceIds = data.map((tabData) => {
        return tabData.resourceId
      }).join(',')

      this.$services.contractRecords.get({
        params: {
          resourceIds: resourceIds,
          partyTwo: partyTwo
        }
      }).then((res) => {
        var records = res.getData()
        records.forEach((item) => {
          for (let [i, contract] of data.entries()) {
            if (contract.resourceId === item.resourceId) {
              let policies = contract.data.policy
              contract.created = true
              for (let [j, policy] of policies.entries()) {
                if (policy.segmentId === item.segmentId) {
                  policy.created = true
                  break;
                }
              }
              break;
            }
          }
        })
      }).then(() => {
        // this.done = data.every((item) => item.created)
      })
    },
    loadResourceDetail(resId) {
      return this.$services.resource.get(resId).then((res) => {
        return res.getData()
      })
    },
    loadPolicyDetail() {
      var query = this.$route.query
      return new Promise((resolve) => {
        if (query.resourceType === RESOURCE_TYPES.pageBuild) {
          resolve(this.loadResourceDetail(query.resourceId))
        } else {
          resolve(null)
        }
      }).then((data) => {
        var resources = [{
          resourceName: this.$route.query.resourceName,
          resourceId: this.$route.query.resourceId
        }]
        var widgetsDataMap = {}
        var tabList = []
        this.activeName = this.$route.query.resourceId

        if (data && data.systemMeta.widgets) {
          resources = resources.concat(data.systemMeta.widgets)
        }

        resources.forEach((obj) => {
          widgetsDataMap[obj.resourceId] = {}
          tabList.push({
            resourceName: obj.resourceName,
            resourceId: obj.resourceId,
            data: widgetsDataMap[obj.resourceId],
            userPolicy: '',
            presentableName: '',
            selected: false, //记录选择哪个策略
            checked: false, //标记是否已选中策略
            created: false  //标记是否已创建过合同
          })
        })

        let resourceIds = resources.map(obj => obj.resourceId)
        return this.$services.policy.get({
          params: {
            resourceIds: resourceIds.join(',')
          }
        }).then((res) => {
          let data = res.getData();
          data.forEach((item) => {
            item.policy.forEach((p) => {
              p._formatSegmentText = this.formatSegmentText(p.segmentText)
            })
            Object.assign(widgetsDataMap[item.resourceId], item)
          })
          return tabList
        }).catch(this.$error.showErrorMessage)
      })
    },
    formatSegmentText(segmentText) {
      return compiler.compile(segmentText, 'beautify').stringArray.splice(1).join(' ').replace(/\n\s/g, '\n');
    },
    validatePageBuildParam() {
      return new Promise((resolve, reject) => {
        var pageBuildResourceId = this.$route.query.resourceId
        var validMap = {}
        var invalidMap = {}

        this.tabList.forEach((tab) => {
          if (tab.checked) {
            validMap[tab.resourceId] = tab
          } else {
            invalidMap[tab.resourceId] = tab
          }
        })

        if (!validMap[pageBuildResourceId]) {
          reject(`没有选中${invalidMap[pageBuildResourceId].resourceName}合同`)
        } else if (Object.keys(validMap).length === this.tabList.length) {
          resolve()
        } else if (Object.keys(validMap).length < 2) {
          reject('至少选择一个widget')
        } else {
          var names = Object.values(invalidMap).map((o) => o.resourceName).join(',')
          resolve(`有部分widgets=>${names}的合同没有被选中`)
        }
      })
    },
    createPageBuildContract(param) {
      //创建pb合同必须一次性选中签约的widget，否则不能补签（后端有绑定逻辑），后续可提供补签功能
      return this.$services.pbContract.post(param).then((res) => {
        if (res.data.errcode !== 0) {
          throw new Error(res.data.msg)
        } else {
          let data = res.getData()
          return data.newContracts.concat(data.oldContracts)
        }
      })
    },
    gotoCreateUserPolicy(contractId) {
      var nodeId = this.$route.params.nodeId
      this.$router.push({
        path: `/node/${nodeId}/presentable/create`,
        query: {contractId: contractId}
      })
    },
    createResourceContract(param) {
      return this.$services.contract.post(param)
        .then((res) => {
          var data = res.getData()
          if (res.data.errcode !== 0) {
            throw new Error(res.data.msg)
          } else {
            return [{
              contractId: data.contractId,
              resourceId: data.resourceId
            }]
          }
        })
    },
    showConfirmDialog(msg) {
      return new Promise((resolve, reject) => {
        this.$confirm(`${msg}，后续不能补签合同，确认继续执行？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resolve()
        }).catch(() => {
          reject(null)
        })
      })
    },
    createContract(selectedContracts) {
      var nodeId = this.$route.params.nodeId
      if (this.$route.query.resourceType === RESOURCE_TYPES.pageBuild) {
        return this.validatePageBuildParam()
          .then((msg) => {
            if (msg) {
              return this.showConfirmDialog(msg)
            }
          })
          .then(() => {
            return this.createPageBuildContract({
              nodeId: nodeId,
              contracts: selectedContracts
            })
          })
      } else {
        let param = selectedContracts[0]
        return this.createResourceContract({
          contractType: '2',
          targetId: param.resourceId,
          segmentId: param.segmentId,
          serialNumber: param.serialNumber,
          partyTwo: nodeId
        })
      }
    },
    createPresentablePolicy(policies) {
      var nodeId = parseInt(this.$route.params.nodeId)
      var promises = []

      policies.forEach((policy) => {
        var params = {
          name: policy.name,
          nodeId: nodeId,
          contractId: policy.contractId,
          policyText: btoa(policy.policyText),
          languageType: 'freelog_policy_lang'
        }
        promises.push(this.$services.presentables.post(params))
      })

      return Promise.all(promises)
        .then((responseList) => {
          var res = responseList[0]
          var data = res.getData()
          return data
        })
    },
    paddingContractIds(policies, contractIds) {
      var contractIdMap = {}
      contractIds.forEach((item) => {
        contractIdMap[item.resourceId] = item.contractId
      })

      policies.forEach((p) => {
        p.contractId = contractIdMap[p.resourceId]
      })
    },
    extractSubmitData() {
      let contracts = [];
      let policies = []
      this.tabList.forEach((tabData) => {
        if (tabData.checked) {
          var policy = tabData.data.policy[tabData.selected]
          contracts.push({
            resourceId: tabData.resourceId,
            segmentId: policy.segmentId,
            serialNumber: tabData.data.serialNumber
          });
          policies.push({
            name: tabData.presentableName,
            resourceId: tabData.resourceId,
            policyText: tabData.userPolicy
          })
        }
      })

      return {
        contracts,
        policies
      }
    },
    submit() {
      var nodeId = parseInt(this.$route.params.nodeId)
      var data = this.extractSubmitData()

      if (!data.contracts.length) {
        return this.$message.warning('请选择合同')
      }

      this.createContract(data.contracts)
        .then((contractIds) => {
          this.paddingContractIds(data.policies, contractIds)
        })
        .then(() => {
          return this.createPresentablePolicy(data.policies)
        })
        .then((data) => {
          this.$message.success('presentable创建成功');
          this.$router.push({
            path: `/node/${nodeId}/presentable/detail#presentable`,
            query: {presentableId: data.presentableId}
          })
        }).catch(this.$error.showErrorMessage)
    }
  }
}

