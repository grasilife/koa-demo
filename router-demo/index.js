const Koa = require('koa');
const app = new Koa();
const routers = require('./router/index');
const path = require('path');
const koaBody = require('koa-body');
const json = require('koa-json');
const logger = require('koa-logger');

// middlewares
app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    formidable: {
      uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => { // 文件上传前的设置
        console.log(`name: ${name}`);
        console.log(file);
      },
    },
  },
}));
app.use(json());
app.use(logger());


app.use(async (ctx, next) => {
  console.log('1.这是一个中间件01');
  await next();
  console.log('5.匹配完路由以后又会返回来执行中间件')
});
app.use(async (ctx, next) => {
  console.log('2.这是一个中间件02');
  await next();
  console.log('4.匹配完路由以后又会返回来执行中间件')
}); 

// routers
app.use(routers.routes()).use(routers.allowedMethods());


app.listen(8123, '127.0.0.1', () => {
  console.log(`The server is running at http://127.0.0.1:8123`)
});
