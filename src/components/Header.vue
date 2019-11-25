<template>
  <div>
    <el-header>
      <el-row>
        <el-col :span="12">
          <div class="logo">Vue开发实战</div>
        </el-col>
        <el-col :span="12">
          <div class="login" v-if="this.$store.state.userInfo">欢迎：{{this.$store.state.userInfo.username}}</div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    created() {
      window.console.log(this.$store.userInfo)
    }
  }
</script>

<style scoped>
  .logo {

  }
</style>
