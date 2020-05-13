<template>
    <div>
      <div class="header" >
        <span style="margin-right: 20px">用户：{{username}}</span>
        <span>积分：{{score}}</span>
      </div>
      <h2 style="margin-top: 30px">七天签到</h2>
      <ul>
        <li v-for="(item,index) in lists" :key="index">
          {{item.text}}
          <el-button type="primary" v-if="index == days && isSignIn == 0" @click="signIn">签到</el-button>
          <el-button type="primary" disabled v-if="index == days - 1 && isSignIn == 1">今日已签到</el-button>
        </li>
      </ul>
    </div>
</template>

<script>
  import { Ajax } from "@/utils";
  import store from "@/store";
  export default {
    name: "Sign",
    data(){
      return {
        lists:[
          {
            text:'积分*1'
          },
          {
            text:'积分*2'
          },
          {
            text:'积分*3'
          },
          {
            text:'积分*4'
          },
          {
            text:'积分*5'
          },
          {
            text:'积分*6'
          },
          {
            text:'积分*7'
          }
        ],
        days:null,
        isSignIn: 1,
        username:store.getters.userInfo.username,
        score: 0
      }
    },
    methods: {
      async signIn(){
        try {
          const res = await Ajax(
            "post",
            "/data/sign.do",
            {userId:store.getters.userInfo.id}
          )
          if (res.code == 0) {
            this.$message.success('签到成功')
            this.getSignData()
          }else{
            console.log(res)
          }
        }catch (e) {
          console.log(e)
        }
      },
      async getSignData(){
        try {
          const res = await Ajax(
            "post",
            "/data/getSignData.do",
            {userId:store.getters.userInfo.id}
          )
          if (res.code == 0) {
            this.days = res.data.days
            this.isSignIn = res.data.isSignIn
            this.score = res.data.score
          }else{
            console.log(res)
          }
        }catch (e) {
          console.log(e)
        }
      }
    },
    mounted(){
      console.log(store.getters.userInfo.id)
      this.getSignData()
    }
  }
</script>

<style scoped lang="less" type="text/less">
  ul{
    padding: 20px;
    width: 300px;
    li{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
    }
  }
  .header{
    padding: 20px;
    display: flex;
    background-color: #409EFF;
    justify-content: flex-end;
    color: #fff;
  }
</style>
