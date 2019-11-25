import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


// 测试Vuex demo 代码
// export default new Vuex.Store({
//   state: {
//     count: 1
//   },
//   mutations: {
//     addOneCount(state) {
//       state.count++
//     },
//     subOneCount(state) {
//       state.count--
//     },
//     addCount(state, payload) {
//       state.count += payload.n;
//     }
//   },
//   actions: {
//     addCount2(context, payload) {
//       context.commit('addCount', payload)
//     }
//   }
// })

export default new Vuex.Store({
  state: {
    userInfo: null,  // {username: '', password: ''}
    tasks: [],
    users: [{username: 'admin', password: '123'},],
    count: 1
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task)
    },
    registerUser(state, payload) {
      window.console.log(payload.userInfo)
      state.users.push(payload.userInfo)
    },
    loginUser(state, payload) {
      state.userInfo = payload.userInfo
    },
    logoutUser(state) {
      state.userInfo = null
    },
    addOneCount(state) {
      state.count++
    },
    subOneCount(state) {
      state.count--
    },
    addCount(state, payload) {
      state.count += payload.n;
    }
  },
  actions: {
    addCount2(context, payload) {
      context.commit('addCount', payload)
    }
  },  // 处理异步操作
  getters: {}
})
