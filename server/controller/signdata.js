const SignData = require('../model/signdata.js');

const getSignData = async function(ctx){
  const data = ctx.request.body;//post
  const result = await SignData.getSignData(data);
    ctx.body = {
      code: 0,
      msg: '获取成功！',
      data: result.userSignInfo
    }
}
const sign = async function(ctx){
  const data = ctx.request.body;//post
  const result = await SignData.sign(data);
  if(result){
    ctx.body = {
      code: 0,
      msg: '签到成功！'
    }
  }else{
    ctx.body = {
      code: 1,
      msg: '签到失败！'
    }
  }
}
module.exports = {
  getSignData,
  sign
}
