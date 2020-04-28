const user = require('../model/user.js');

const register = async function(ctx){
  const data = ctx.request.body;//post
  const result = await user.register(data);
  if(data.username == ''){
    ctx.body = {
      code: 1,
      msg: '用户名不能为空！'
    }
    return;
  }
  if(data.password.trim() == ''){
    ctx.body = {
      code: 1,
      msg: '密码不能为空！'
    }
    return;
  }
  if(result.isContain){
    ctx.body = {
      code: 1,
      msg: '用户名重复！',
    }
  }else{
    ctx.body = {
      code: 0,
      msg: '注册成功！',
      data: result.userInfo
    }
  }
}

const login = async function(ctx){
  const data = ctx.request.body;//post
  const result = await user.login(data);
  if(result.isContain){
    if(data.password == result.userInfo.password){
      ctx.body = {
        code: 0,
        msg: '登录成功！',
        data: result.userInfo
      }
      ctx.cookies.set(
        'username',
        'admin',
        {
          //domain: 'localhost',  // 写cookie所在的域名
          //path: '/',       // 写cookie所在的路径
          maxAge: 1 * 24 * 60 * 60 * 1000, // cookie有效时长 1天
          expires: new Date('2018-02-15'),  // cookie失效时间
          httpOnly: false,  // 是否只用于http请求中获取
          overwrite: false  // 是否允许重写
        }
      )
    }else{
      ctx.body = {
        code: 1,
        msg: '密码错误！',
      }
      ctx.cookies.set('username','',{signed:false,maxAge:0})
      return;
    }
  }else {
    ctx.body = {
      code: 1,
      msg: '用户不存在！',
    }
    ctx.cookies.set('username','',{signed:false,maxAge:0})
    return;
  }

}

module.exports = {
  register,
  login
}
