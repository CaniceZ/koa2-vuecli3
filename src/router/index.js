import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";
import Cookie from "js-cookie";

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
      path: '/register',
      component: resolve => require(['../pages/Register.vue'], resolve)
    }
    , {
      path: '/list',
      component: resolve => require(['../pages/List.vue'], resolve)
    },
    {
      path: '',
      redirect: "/list",
      component: resolve => require(['../pages/List.vue'], resolve)
    },
  ]
})

function getCookie(name){
   var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
   if(arr != null){
     return unescape(arr[2]);
   }else{
     return null;
   }
}

router.beforeEach((to, from, next) => {
  const token = getCookie('userId');
  console.log(token)
  if (to.path === '/login') { // 如果是跳转到登录页的
    if(token !== null){
      console.log(1)
      next({ path: "/list" });
    }else{
      console.log(2)
      next()
    }
  } else {
    if (token !== null) {
      store.dispatch('getUserInfo', Cookie.get('userId')).then(
        ()=>{
          console.log(3)
          next() // 如果有token就正常转向
        }
      )
    } else {
      console.log(4)
      next('/login') // 否则跳转回登录页
    }
  }
})

export default router
