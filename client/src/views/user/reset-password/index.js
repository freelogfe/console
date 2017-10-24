import {storage} from '@/lib'

export default {
  name: 'reset-password',

  data() {
    // form validate rules
    const rules = {
      loginName: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
      ],
      verifyCode: [
        {required: true, message: '请输入验证码', trigger: 'blur'}
      ]
    }

    return {
      model: {
        loginName: '',
        verifyCode: ''
      },
      rules: rules,
      error: null,
      loading: false
    }
  },

  methods: {
    submit(ref) {
      this.$refs[ref].validate(valid => {
        if (!valid) {
          return false
        }

        this.error = null
        this.loading = true

        this.$services.other.resetPassword(this.model).then(token => {
          this.$router.replace(this.$route.query.redirect || '/')
          this.loading = false
        }).catch(err => {
          this.error = {title: '发生错误', message: '出现异常，请稍后再试！'}
          switch (err.response && err.response.status) {
            case 401:
              this.error.message = '用户名或密码错误！'
              break
            case 500:
              this.error.message = '服务器内部异常，请稍后再试！'
              break
          }
          this.loading = false
        });
      })
    }
  }
}
