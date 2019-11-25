<template>
  <div>
    <el-col>在VuexDemo2组件中，Vuex state中count的值为：{{this.$store.state.count}}</el-col>
    <el-col class="add-one-count">
      <el-col :span="6">
        <el-button
            type="primary"
            size="small"
            @click="addOneCount"
        >
          Add One Count
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-button
            type="primary"
            size="small"
            @click="subOneCount"
        >
          Sub One Count
        </el-button>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: 'VuexDemo2',
    methods: {
      addOneCount() {
        this.$store.commit('addOneCount')
      },
      subOneCount() {
        this.$store.commit('subOneCount')
      },
    }
  }
</script>

<style scoped>
  .add-one-count {
    margin-top: 20px;
  }
</style>
