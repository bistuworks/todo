<template>
  <div class="login-container">
    <div class="el-col-2"></div>
    <div class="login-container el-col-10">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px" class="login-form"
               autocomplete="on"
               label-position="left">
        <div class="title-container">
          <h3>登录</h3>
        </div>
        <el-form-item label="Username">
          <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"/>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
              ref="password"
              v-model="loginForm.password"
              placeholder="Password"
              name="password"
              type="password"
              tabindex="2"
              autocomplete="on"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur'}],
          password: [{required: true, trigger: 'blur'}]
        }
      }
    },
    created() {
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    methods: {
      onSubmit() {
        if (this.$store.state.users.find((value) => {
          return value.username === this.loginForm.username && value.password === this.loginForm.password
        }) !== undefined) { // 用户记录中存在，则允许登录
          this.$store.commit('loginUser', {
            type: 'loginUser',
            userInfo: this.loginForm
          })
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 2000,
            showClose: true
          });
          this.$router.push('/')
        } else {
          this.$message({
            message: '登录失败',
            type: 'error',
            duration: 2000,
            showClose: true
          });
        }
      }
    }
  }
</script>

<style scoped>
  .login-container {

  }

  .login-form {

  }

  .title-container {
    text-align: center;
  }
</style>
