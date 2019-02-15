
export default {
  name: 'node-creator',
  data() {
    const validateNodeDomain = (rule, value, callback) => {
      if (value) {
        const DOMAIN_REG = /^[a-zA-Z\d-]+$/
        if (value.length < 4 || value.length > 20) {
          callback(new Error(this.$i18n.t('node.createRules.length')))
        } else if (!DOMAIN_REG.test(value)) {
          callback(new Error(this.$i18n.t('node.createRules.prefix')))
        } else {
          callback()
        }
      } else {
        callback(new Error(this.$i18n.t('node.createRules.noEmpty')))
      }
    }

    const formRules = {
      nodeName: [{ required: true, message: this.$i18n.t('node.nodeNameRules.noEmpty'), trigger: 'blur' },
        {
          min: 4, max: 20, message: this.$i18n.t('node.nodeNameRules.length'), trigger: 'blur'
        }],
      nodeDomain: [{ validator: validateNodeDomain, trigger: 'blur' }]
    }

    return {
      dataForm: {
        nodeName: '',
        nodeDomain: ''
      },
      formRules
    }
  },
  computed: {
    domainPostfix() {
      return /\.test/.test(window.location.host) ? '.testfreelog.com' : '.freelog.com'
    }
  },
  mounted() {
  },
  methods: {
    goBackHandler() {
      window.history.back()
    },
    createNode() {
      const self = this
      const data = Object.assign({}, self.dataForm)
      data.nodeDomain = data.nodeDomain.toLowerCase()
      self.$services.nodes.post(self.dataForm)
        .then((res) => {
          const responseData = res.data
          if (responseData.errcode !== 0) {
            this.$message.error(responseData.msg)
          } else {
            self.$message.success(this.$i18n.t('node.createSuccess'))
            this.$store.dispatch('addNode', responseData.data)
            setTimeout(() => {
              self.$router.push({ path: `/node/${responseData.data.nodeId}` })
            }, 1e3)
          }
        })
        .catch(this.$error.showErrorMessage)
    },
    comfirm() {
      return this.$confirm(this.$i18n.t('node.confirmMessages.question'), this.$i18n.t('node.confirmMessages.tip'), {
        confirmButtonText: this.$i18n.t('node.confirmMessages.confirm'),
        cancelButtonText: this.$i18n.t('node.confirmMessages.cancel'),
        type: 'warning'
      })
    },
    submitForm(formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          this.comfirm()
            .then(() => {
              this.createNode()
            })
            .catch(() => {
            })
        }
      })
    }
  }
}
