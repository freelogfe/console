<template>
  <pagination class="node-presentable-row"
              :config="tableConfig"
              :formatHandler="formatHandler"
              ref="listRef"
              :showFooter="showFooter"
              :pagination="paginationConfig">
    <template slot="list">
      <el-table-column
              label=""
              width="100">
        <template slot-scope="scope">
          <div>
            <a :href="`/resource/detail/${scope.row.resourceId}`" target="_blank">
              <img :src="scope.row.resourceInfo.postImgUrl | padImage"
                   :class="{'resource-default-preview':!scope.row.resourceInfo.postImgUrl}"
                   alt="">
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column
              label="">
        <template slot-scope="scope">
          <p class="resource-name" :title="scope.row.presentableName">{{ scope.row.presentableName }} </p>
          <p class="resource-name" :title="scope.row.presentableId">{{ scope.row.presentableId }} </p>
        </template>
      </el-table-column>
      <el-table-column
              width="180"
              label="签约状态">
        <template slot-scope="scope">
          <div class="contract-state-info" :class="[
                      scope.row.hasContract?'active-status-2':'active-status-0',
                      {'is-presentable-online':scope.row.isOnlineChecked}
                    ]">
            <i class="dot"></i>
            <div class="scheme-state">
              <div>
                <template v-if="scope.row.hasContract">已签约</template>
                <template v-else>
                  未签约
                  <el-button type="text" @click="deletePresentableHandler(scope.row)"><i class="el-icon-delete"></i>
                  </el-button>
                </template>
              </div>
              <p class="scheme-info" v-if="scope.row.scheme && scope.row.scheme.selectedPolicy">
                {{scope.row.scheme.authSchemeName}}/{{scope.row.scheme.selectedPolicy.policyName}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
              width="250"
              label="">
        <template slot-scope="{row}">
          <div class="presentable-nav-links active-status-0">
            <router-link :to="row.detailLink + '?tab=policy'">
              <el-button type="text" class="nav-link-btn">策略管理<i class="dot" v-if="(row.status&2) !== 2"></i>
              </el-button>
            </router-link>
            <span>|</span>
            <router-link :to="row.detailLink + '?tab=contract'">
              <el-button type="text" class="nav-link-btn" :disabled="!row.hasContract">合约管理<i class="dot"
                                                                                              v-if="row.hasContract && row.isContractActived === false"></i>
              </el-button>
            </router-link>
            <span>|</span>
            <router-link :to="row.detailLink + '?tab=scheme'">
              <el-button type="text" class="nav-link-btn">授权方案<i class="dot" v-if="(row.status&1) !== 1"></i>
              </el-button>
            </router-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column
              width="150"
              label="资源类型">
        <template slot-scope="scope">
          <div>
            <span class="resource-type" :class="['is-'+scope.row.resourceInfo.resourceType]">{{scope.row.resourceInfo.resourceType}}</span>
          </div>
        </template>
      </el-table-column>
      <slot name="append"></slot>
    </template>
    <template slot="empty">
      <slot name="empty"></slot>
    </template>
  </pagination>
</template>

<script>
import {PRESENTABLE_STATUS_TIPS} from '@/config/presentable'
import {loadAuthSchemes} from '@/data/scheme/loader'
import Pagination from '@/components/Pagination/index.vue'

export default {
  name: 'node-presentable-list',

  data() {
    return {
      tableConfig: {
        rowClassName: 'resource-row',
        'cell-class-name': 'res-row-cell',
        'show-header': false
      },
      paginationConfig: {
        target: `/v1/presentables`,
        params: {
          nodeId: this.$route.params.nodeId
        }
      }
    }
  },

  props: {
    params: Object,
    showFooter: Boolean
  },

  components: {Pagination},

  watch: {
    params: {
      deep: true,
      handler() {
        this.reload()
      }
    },
    $route() {
      if (!this.$route.params.nodeId) return
      this.paginationConfig.params.nodeId = this.$route.params.nodeId
    }
  },

  mounted() {
    this.reload()
  },

  methods: {
    setParams() {
      var params = Object.assign({
        nodeId: this.$route.params.nodeId
      }, this.params || {})

      this.$set(this.paginationConfig, 'params', params)
    },
    refresh() {
      this.$refs.listRef.reload()
    },
    reload() {
      this.setParams()
      this.refresh()
    },
    formatHandler(list) {
      if (!list || !list.length) {
        return []
      }

      var authSchemeIds = []
      var maps = {}
      var schemeIdMaps = {}
      var presentablesIdMap = {}
      var promises = []
      var promise

      list.forEach((item, index) => {
        let contract = this.getPresentableContract(item)

        if (contract) {
          authSchemeIds.push(contract.authSchemeId)
          schemeIdMaps[contract.authSchemeId] = {
            index, contract
          }
        }

        maps[item.resourceId] = index
        presentablesIdMap[item.presentableId] = item
        item.resourceInfo.postImgUrl = this.resolvePostImgUrl(item.resourceInfo)
        this.resolvePresentable(item)
      })

      if (authSchemeIds.length) {
        promise = this.loadPresentablesSchemes(authSchemeIds)
          .then(schemes => {
            schemes.forEach(scheme => {
              let {index, contract} = schemeIdMaps[scheme.authSchemeId]
              scheme.selectedPolicy = this.getSelectedPolicy(scheme, contract)
              this.$set(list[index], 'scheme', scheme)
            })
            schemeIdMaps = null
          })
        promises.push(promise)
      }

      var presentableIds = Object.keys(presentablesIdMap)
      if (presentableIds.length) {
        promise = this.loadPresentablesAuth(presentableIds)
          .then((auths) => {
            auths.forEach(auth => {
              let presentable = presentablesIdMap[auth.presentableId]
              presentable.authResult = Number.isInteger(auth.authResult) ? auth.authResult : -1
            })
          })

        promises.push(promise)
        promise = this.loadPresentablesContractState(presentableIds)
          .then(states => {
            states.forEach(state => {
              let presentable = presentablesIdMap[state.presentableId]
              presentable.isContractActived = (state.status === 1)
            })
          })
        promises.push(promise)
      }

      if (promises.length) {
        Promise.all(promises).then(() => {
          this.fillWarningTips(list)
        })
      }

      return list
    },
    fillWarningTips(presentables) {
      //判断授权链上的策略包含presentable授权
      const tips = {
        'no': '未获得授权', //合同未到达presentable状态，无法让c端用户签约
        'yes': '已获得授权'
      }
      const contractTips = {
        'no': '已签约合同未全部激活',
        'yes': '全部激活'
      }
      const policyTips = {
        'no': '没有可用策略',
        'yes': '已有策略'
      }

      presentables.forEach(presentable => {
        let warningTips = []

        if (presentable.policy.length) {
          var isHasPolicy = presentable.policy.some(policy => policy.status === 1)
          if (!isHasPolicy) {
            warningTips.push(policyTips.no)
          }
        } else {
          warningTips.push(policyTips.no)
        }

        if (presentable.authResult !== 1) {
          warningTips.push(tips.no)
        }
        // if (presentable.hasContract && !presentable.isContractActived) {
        //   warningTips.push(contractTips.no)
        // }

        if (warningTips.length) {
          this.$set(presentable, 'warningTip', warningTips.join(','))
        }
      })
    },
    //查询presentable合同激活情况
    loadPresentablesContractState(presentableIds) {
      // /v1/presentables/getPresentableContractState?presentableIds={presentableId}&nodeId={nodeId}
      return this.$axios.get(`/v1/presentables/getPresentableContractState`, {
        params: {
          presentableIds: presentableIds.join(','),
          nodeId: this.$route.params.nodeId
        }
      }).then(res => {
        const {ret, errcode, msg, data} = res.data
        if (ret === 0 && errcode === 0) {
          return data
        } else {
          throw new Error(msg)
        }
      })
    },
    //查询presentable的授权链是否支持二次签约授权
    loadPresentablesAuth(presentableIds) {
      return this.$axios.get('/v1/auths/presentables/getPresentableContractChainAuth', {
        params: {
          presentableIds: presentableIds.join(','),
          nodeId: this.$route.params.nodeId
        }
      }).then(res => {
        const {ret, errcode, msg, data} = res.data

        if (ret === 0 && errcode === 0) {
          return data
        } else {
          throw new Error(msg)
        }
      })
    },
    resolvePresentable(item) {
      item.isOnlineChecked = !!item.isOnline
      item._statusInfo = PRESENTABLE_STATUS_TIPS[item.status]
      item.isReady = (item.status & 7) === 7
      item.hasContract = item.contracts.length > 0
      item.detailLink = `/node/${this.$route.params.nodeId}/presentable/${item.presentableId}`
    },
    //加载presentable已签约方案&策略信息
    loadPresentablesSchemes(authSchemeIds) {
      return loadAuthSchemes({
        authSchemeIds: authSchemeIds
      }).then(schemes => {
        return schemes
      })
    },
    getSelectedPolicy(scheme, contract) {
      for (let i = 0; i < scheme.policy.length; i += 1) {
        const policy = scheme.policy[i]
        if (policy.segmentId === contract.policySegmentId) {
          return policy
        }
      }
    },
    getPresentableContract(presentableInfo) {
      const contracts = presentableInfo.contracts || []
      if (contracts.length) {
        let contract
        for (let i = 0; i < contracts.length; i += 1) {
          contract = contracts[i]
          if (contract.resourceId === presentableInfo.resourceId) {
            return contract
          }
        }
      }

      return null
    },
    resolvePostImgUrl(resource) {
      let src

      if (resource.previewImages.length) {
        src = resource.previewImages[0]
      } else {
        src = ''
      }

      return src
    },
    deletePresentableHandler(presentable) {
      this.$emit('delete', presentable)
    }
  }
}
</script>


<style lang="less" scoped>
  @import "../../../styles/mixin";

  .node-presentable-row {
    .dot {
      margin-right: 5px;
    }

    img {
      width: 80px;
      height: 60px;
      display: inline-block;
    }

    .contract-state-info {
      display: flex;
      align-items: center;
      width: 100%;
      .scheme-state {
        display: inline-block;
        width: 95%;
        i {
          color: #EA7171;
          font-size: 20px;
          vertical-align: middle;
        }
      }
      .scheme-info {
        .text-ellipsis;
        font-size: 12px;
      }
    }

    .resource-name {
      .text-ellipsis;
      width: 100%;
    }

    .resource-type {
      background-color: #F1F1F1;
      border: 1px solid #E0E0E0;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 14px;
      color: #666666;
      max-width: 110px;
      display: inline-block;
      .text-ellipsis;
      &.is-page_build {
        color: #E89D1F;
        border-color: #E89D1F;
        background-color: rgba(249, 191, 93, .2);
      }
    }

    .presentable-nav-links {
      span {
        color: #D8D8D8;
        padding: 0 6px;
      }

      .nav-link-btn {
        position: relative;
      }

      .dot {
        position: absolute;
        top: 0;
        right: -11px;
        &:after {
          border-width: 4px;
          width: 0;
          height: 0;
        }
      }
    }
  }
</style>
