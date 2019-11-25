<template>
  <div>
    <el-col class="show-count">
      <div>在VuexDemo1组件中，Vuex state中count的值为：{{this.$store.state.count}}</div>
    </el-col>
    <el-row>
      <el-col :span="8">
        <el-input-number v-model="num" :min="1" label="描述文字"></el-input-number>
      </el-col>
      <el-col :span="8">
        <el-button
            type="primary"
            size="small"
            @click="addNumCount"
        >
          使用 mutations Add {{num}} Count
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button
            type="primary"
            size="small"
            @click="addNumCount2"
        >
          使用 action Add {{num}} Count
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'VuexDemo',
    data() {
      return {
        num: 0
      }
    },
    methods: {
      addNumCount() {
        this.$store.commit('addCount', {
          n: this.num
        })
      },
      addNumCount2() {
        this.$store.dispatch('addCount2', {
          n: this.num
        })
      }
    }
  }
</script>

<style scoped>
  .show-count {
    margin-bottom: 20px;
  }

</style>
