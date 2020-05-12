const user = require('../controller/user.js');
const router = require('koa-router')();


router.post('/register', user.register);//注册

router.post('/login.do', user.login);//登录

router.post('/info.do', user.userInfo);//获取用户信息

module.exports = router; // 把router规则暴露出去
