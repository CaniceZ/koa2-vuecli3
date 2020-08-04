<template>
    <div class="login-wrap">
        <div class="ms-title">欢迎登录</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p><el-button type="text" style="float: right" @click="$router.push('/register')">去注册</el-button></p>
                <p v-if="$route.query.userInfo" style="font-size:12px;line-height:30px;color:#999;">Tips :用户名：{{$route.query.userInfo.username}}, 密码：{{$route.query.userInfo.password}}。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { Ajax } from "@/utils";
import request from '@/utils/request'
export default {
  data: function() {
    return {
      url: process.env.VUE_APP_API,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  async mounted(){
     request({
      url: '/menu/v1/getMenuList', // 请求地址
      method: 'post',
      reqDesction: 'AppMenuReq.getMenuList', // 请求体
      resDesction: 'AppMenuResq.MenuList', // 返回体
      data:{"appId":"76sy001","platformId":"76box"}, // 参数数据
    }).then(res=>{
       if(res.state==1){
         console.log(res)
       }else{
         console.log("请求失败")
       }
     }).catch(err=>{
       console.log(err,'aaa')
     })

    document.querySelector('.login-wrap').style.height = document.documentElement.clientHeight + 'px';
    //注册跳转登录，自动复制账号密码
    if(this.$route.query.userInfo){
      this.ruleForm.username = this.$route.query.userInfo.username;
      this.ruleForm.password = this.$route.query.userInfo.password;
    }
  },
  methods: {
   submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = await Ajax(
            "post",
            "/login.do",
            this.ruleForm
          );
          if (data.code == 0) {
            this.$router.push("/list");
          }
          //sessionStorage.setItem('ms_username',this.ruleForm.username);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }

};
</script>

<style scoped lang="less" type="text/less">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgb(50,50,120);
  overflow: hidden;
  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
  }
}
</style>
