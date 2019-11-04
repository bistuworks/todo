import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    tasks: [],
    count: 0
  },
  mutations: {
    addTask(state, task) {
      state.count++;
      state.tasks.push(task)
    }
  },
  actions: {},  // 处理异步操作
  getters: {}
})
