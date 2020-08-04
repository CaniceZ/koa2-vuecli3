
const schedule = require('node-schedule');
const SignData = require('../model/signdata.js');

function scheduleObjectLiteralSyntax(){
  //dayOfWeek
  //month
  //dayOfMonth
  //hour
  //minute
  //second
  //每天凌晨清除签到状态，其它组合可以根据代码中的注释参数名自由组合
  schedule.scheduleJob({hour: 0, minute: 0,second: 0}, function(){
    SignData.updateAllSignStatus()
  });
  //每周一凌晨0点0分清除累计签到天数
  schedule.scheduleJob({hour: 0, minute: 0,second: 0,dayOfWeek: 1}, function(){
    SignData.updateSignDays()
  });
}

module.exports = scheduleObjectLiteralSyntax
