<template>
  <div>
    <el-row>
      <el-col :span="12">
        <vuex-demo></vuex-demo>
      </el-col>
      <el-col :span="12" class="demo2-wrapper">
        <vuex-demo2></vuex-demo2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VuexDemo from "@/pages/demo/components/VuexDemo"
  import VuexDemo2 from "@/pages/demo/components/VuexDemo2"

  export default {
    name: 'Demo',
    components: {VuexDemo, VuexDemo2}
  }
</script>

<style scoped>
  .demo2-wrapper {
    height: 1000px;
    border-left: 2px lightskyblue dashed;
    padding: 20px;
  }

</style>
