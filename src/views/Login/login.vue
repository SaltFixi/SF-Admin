<template>
  <div class="login-container">
    <div class="wrap">
      <div class="form animate__animated animate__bounceInDown">
        <div class="right">
          <div class="right-con">
            <h1 class="login-title">登录界面</h1>
            <a-form-model
              :model="login_form_model"
              @submit="handleLogin"
              @submit.native.prevent
              ref="login_form"
              :rules="login_form_rules"
            >
              <a-form-model-item label="用户名" prop="user">
                <a-input v-model="login_form_model.user" placeholder="Username">
                  <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
                </a-input>
              </a-form-model-item>

              <a-form-model-item label="密码" prop="password">
                <a-input v-model="login_form_model.password" type="password" placeholder="Password">
                  <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
                </a-input>
              </a-form-model-item>

              <a-form-model-item>
                <a-checkbox> 24小时内免登录 </a-checkbox>
              </a-form-model-item>

              <a-form-model-item>
                <button class="btn" html-type="submit">登录</button>
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      login_form_model: {
        user: '',
        password: ''
      },
      login_form_rules: {
        user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLogin: debounce(async function () {
      await this.$valid('login_form')

      try {
        const loginModel = this.login_form_model
        // 将表单中的用户名和密码发送到后端去校验，后端将解密后的密码存一下
        loginModel.password = md5(
          md5(loginModel.password) + 'saltedfixi'
        ).split('').reverse().join('')

        const login = (loginModel) => this.$store.dispatch('account/login', loginModel)

        const resultCode = await login(loginModel)
        if (resultCode) {
          this.$ms('success', '登录成功', '欢迎您！')
          this.$router.push('/')
        } else {
          this.$ms('error', '登录失败', '请检查用户名或密码错误。')
        }
      } catch (error) {
        this.$ms('error', '服务器异常')
      }
    }, 500)
  }
}
</script>

<style scoped src="./login.css">
</style>
