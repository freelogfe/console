<template>
  <div>
    <div style="margin-bottom: 15px;">
      <el-input placeholder="请输入内容" v-model="queryPolicyTpl" class="input-with-select">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>

    <el-tabs type="border-card" v-model="currentTabName" @tab-click="tabClickHandler">
      <el-tab-pane label="示例模板" name="official">
        <policy-tpl-list :list="defaultPolicyTpls"
                         :filter="filterHandler"
                         @select="selectPolicyTplHandler"></policy-tpl-list>
      </el-tab-pane>
      <el-tab-pane label="我的模板" name="mine">
        <policy-tpl-list :list="policyTpls"
                         :filter="filterHandler"
                         @select="selectPolicyTplHandler"></policy-tpl-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PolicyTplList from '@/components/policyTplSelector/index.vue'
import { storage } from '@/lib'
import { presentable, resource } from '../defaultPolicyTpls'

export default {
  name: 'policy-template-selector',
  data() {
    return {
      currentTabName: storage.get('POLICY_TPL_ACTIVE_TAB_NAME') || 'official',
      policyTpls: [],
      queryPolicyTpl: '',
      defaultPolicyTpls: (this.$route.meta.type === 'node') ? presentable : resource
    }
  },

  props: {
    callback: {
      type: Function
    }
  },

  components: { PolicyTplList },

  mounted() {
    this.loadCustomPolicyTpl()
      .then((list) => {
        this.policyTpls = list
      })
  },

  methods: {
    loadCustomPolicyTpl() {
      return this.$services.policyTemplate.get({
        params: {
          templateType: 1,
          pageSize: 1e2
        }
      }).then((res) => {
        const data = res.getData()
        if (data) {
          return data.dataList
        }
        throw new Error(res.data.msg)
      })
    },
    selectPolicyTplHandler(data) {
      if (typeof this.callback === 'function') {
        this.callback({
          name: 'selectPolicyTemplate',
          data: {
            template: data.template
          }
        })
      }
    },
    filterHandler(list) {
      return list.filter(tpl => (this.queryPolicyTpl ? tpl.name.indexOf(this.queryPolicyTpl) > -1 : true))
    },
    tabClickHandler(tab) {
      storage.set('POLICY_TPL_ACTIVE_TAB_NAME', tab.name)
    }
  }
}
</script>
