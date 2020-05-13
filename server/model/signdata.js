
const db = require('../config/db.js');
const SignData = db.SignData

//获取用户签到信息
const getSignData = async function(data){
  if(!data.userId){
    return false
  }
  let userSignInfo = await SignData.findOne({//查看该用户是否有在signdatas表是否有签到数据
    where: {
      userId: data.userId
    },
    attributes: ["userId","days","isSignIn","score"],
  })
  if(!userSignInfo){ //不存在则创建一条,再查询，返回
    await SignData.create({
      userId: data.userId,
      days: 0,
      isSignIn: 0
    })
    let userSignInfo2 = await SignData.findOne({
      where: {
        userId: data.userId
      },
      attributes:["userId","days","isSignIn","score"],
    })
    return {
      'userSignInfo': userSignInfo2.dataValues
    }
  }else{  //存在则直接返回
    return {
      'userSignInfo': userSignInfo.dataValues
    }
  }
}

//获取用户签到信息
const sign = async function(data){
  let userSignInfo = await SignData.findOne({
    where: {
      userId: data.userId
    },
  })
  await SignData.update(//查看该用户是否有在signdatas表是否有签到数据
    {
      days: userSignInfo.dataValues.days + 1,
      score: userSignInfo.dataValues.score + userSignInfo.dataValues.days + 1,//积分规则：增加积分等于当周签到天数
      isSignIn: 1
    },
    {
      where: {
        userId: data.userId
      },
    }
  )
  return true
}

//批量处理签到状态
const updateAllSignStatus = async function(){
  await SignData.update(
    {
      isSignIn: 0
    },
    {
      where: {
        isSignIn: 1
      },
    }
  )
}
//批量处理累计签到天数
const updateSignDays = async function(){
  await SignData.update(
    {
      days: 0
    },
    {
      where: {
        days: [1,2,3,4,5,6]
      },
    }
  )
}
module.exports = {
  getSignData,
  sign,
  updateAllSignStatus,
  updateSignDays
}
