const appKoa = new require('koa')
  , koa = require('koa-router')()
  , path =require('path')
  , serve = require('koa-static')
  , scheduleObjectLiteralSyntax = require('./schedule')
  , list = require('./routes/list.js')
  , user = require('./routes/user.js')
  , signdata = require('./routes/datas.js');
// const SignData = require('./model/signdata.js');
app = new appKoa();

// 跨域设置
// app.use(convert(cors));
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});
// 静态文件serve在koa-router的其他规则之上
app.use(serve(path.resolve('../dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.use(require('koa-bodyparser')());

app.on('error', function(err, ctx){
  console.log('server error', err);
});
scheduleObjectLiteralSyntax()//12点定时清除签到状态
koa.use('/api', list.routes()); // 挂载到koa-router上，同时会让所有的list的请求路径前面加上'/api'的请求路径。
koa.use(user.routes())
koa.use('/data', signdata.routes());
app.use(koa.routes()); // 将路由规则挂载到Koa上。
app.listen(3000,() => {
  console.log('Koa is listening in 3000');
});
// SignData.updateSignDays()
module.exports = app;
