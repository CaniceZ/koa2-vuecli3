const signdata = require('../controller/signdata.js');
const router = require('koa-router')();

router.post('/getSignData.do', signdata.getSignData);//查询签到信息
router.post('/sign.do', signdata.sign);//查询签到信息

module.exports = router; // 把router规则暴露出去
