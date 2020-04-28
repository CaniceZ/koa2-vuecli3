<template>
    <div class="account-container" :style="{ background:'url(' + url + ') no-repeat center'}">
        <div class="ms-title">欢迎注册</div>
        <div class="ms-register">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="user-btn">
                    <el-button type="primary" style="width: 200px" size="big" @click="submitForm('ruleForm')">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { Ajax } from "@/utils";

export default {
  data: function() {
    return {
      url: require("../assets/images/bg.png"),
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = await Ajax(
            "post",
            "/register",
            this.ruleForm
          );
          if (data.code == 0) {
            this.$router.push({path: "/login",query: { userInfo: data.data}});
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
.account-container {
  background-size: cover;
  min-height: 100%;
  padding-top: 150px;
  min-height: 100%;
  box-sizing: border-box;
  .ms-title {
    font-size: 30px;
    color: #fff;
    text-align: center;
    margin-bottom: 30px;
  }
  .ms-register{
    max-width: 400px;
    background-color: #fff;
    border-radius: 8px;
    padding: 40px;
    margin: 0 auto;
    .user-btn{
      display: flex;
      justify-content: center;
    }
  }

}
</style>
