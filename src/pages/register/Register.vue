<template>
  <div class="register-container">
    <div class="el-col-2"></div>
    <div class="register-container el-col-10">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" label-width="80px" class="login-form"
               autocomplete="on"
               label-position="left">
        <div class="title-container">
          <h3>注册</h3>
        </div>
        <el-form-item label="Username">
          <el-input
              ref="username"
              v-model="registerForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"/>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
              ref="password"
              v-model="registerForm.password"
              placeholder="Password"
              name="password"
              type="password"
              tabindex="2"
              autocomplete="on"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        registerForm: {
          username: '',
          password: ''
        },
        registerRules: {
          username: [{required: true, trigger: 'blur'}],
          password: [{required: true, trigger: 'blur'}]
        },
      }
    },
    methods: {
      onSubmit() {
        this.$store.commit('registerUser', {
          userInfo: this.registerForm
        })
        this.$message({
          message: '注册成功',
          type: 'success',
          duration: 1000,
          showClose: true
        });
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
.title-container {
  text-align: center;
}
</style>
