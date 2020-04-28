// models/user.js
const db = require('../config/db.js'),
  userModel = '../mysql/user.js'; // 引入user的表结构
const TodolistDb = db.Todolist; // 引入数据库

const User = TodolistDb.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

//创建一条
const register = async function(data){
  // User.sequelize.query('SELECT * FROM users').then(res=>{return res}) 查询所有数据的两种方式
  // let results = User.findAll({raw:true}) 查询所有数据的两种方式
  let isContain = await User.findOne({where: {username: data.username}}) //查看注册用户名是否存在
  console.log(isContain)
  if(isContain){//重复返回true
    return {'isContain': true}
  }else{
    //不重复则入库，返回false
    await User.create({
      username: data.username,
      password: data.password
    })
    let userInfo = await User.findOne({where: {username: data.username}})
    return {
      'isContain': false,
      'userInfo': userInfo.dataValues
    }
  }
}
const login = async function(data){
  let usernameQuery = await User.findOne({where: {username: data.username}}) //查看注册用户名是否存在
  if(usernameQuery){//存在返回true
    return {
      'isContain': true,
      'userInfo': usernameQuery.dataValues
    }
  }else{
    //不存在该用户
    return {
      'isContain': false,
    }
  }
}

module.exports = {
  register,
  login
}
