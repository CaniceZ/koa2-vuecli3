import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  getters:{
    userInfo: state => state.userInfo
  },
  mutations: {
    GETUSERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
  },
  actions: {
    // 获取用户信息
    getUserInfo({ commit }, userInfo) {
      commit("GETUSERINFO", userInfo);
    },
  }
})
