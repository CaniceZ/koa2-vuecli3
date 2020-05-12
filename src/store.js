import Vue from 'vue'
import Vuex from 'vuex'
import { Ajax } from "@/utils";
import Cookie from "js-cookie"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:{}
  },
  getters:{
    userInfo: state => state.userInfo
  },
  mutations: {
    GETUSERINFO: (state,userInfo) => {
      Ajax(
        "post",
        "/info.do",
        {userId: userInfo}
      ).then(
        res => {
          state.userInfo = res.data;
        }
      );

    },
  },
  actions: {
    // 获取用户信息
    getUserInfo({ commit }, userInfo) {
      commit("GETUSERINFO", userInfo);
    },
  }
})
