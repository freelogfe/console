import {highlight, compile, beautify} from '@freelog/resource-policy-lang'


import rules from '../rules'

export default {
  name: 'policy-tpl-creator',
  data() {
    var type = this.$route.meta.type
    return {
      type: type,
      data: {
        name: '',
        template: '',
        templateType: (type === 'node') ? 2 : 1
      },
      rules: rules
    }
  },

  mounted() {

  },
  methods: {
    createPolicyTpl(data) {
      return this.$services.policyTemplate.post(data)
        .then((res) => {
          var data = res.data;
          if (data.errcode === 0) {
            this.$message.success('创建成功')
            this.$router.push({path: `/${this.type}/policy_tpl/detail`, query: {id: data.data.id}})
          } else {
            this.$error.showErrorMessage(res)
          }
        })
        .catch(this.$error.showErrorMessage)
    },
    validatePolicy() {
      var tpl = this.data.template
      var ret = compile(tpl);

      if (ret.errorMsg) {
        this.$message.error(ret.errorMsg)
        return false
      } else {
        this.data.template = beautify(tpl)
        this.$message.success('校验通过')
        return true
      }
    },
    submitHandler() {
      var data = Object.assign({}, this.data);

      if (this.validatePolicy()) {
        data.template = btoa(data.template)
        this.createPolicyTpl(data)
      }
    }
  }
}
