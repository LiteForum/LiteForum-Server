const Koa = require('koa')
const app = new Koa()
const helmet = require('koa-helmet')
const views = require('koa-views')
const json = require('koa-json')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const path = require('path')
// const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const connectDB = require("./db/mongoose")
const koajwt = require('koa-jwt')
const { TokenSecretKey, NoAuthRouters } = require('./config');
const errorHandle = require('./utils/errorHandle');
const checkDirExist = require('./utils/Upload/checkDirExist');
const getUploadFileExt = require('./utils/Upload/getUploadFileExt');
const getUploadDirName = require('./utils/Upload/getUploadDirName');
const getUploadFileName = require('./utils/Upload/getUploadFileName');

const index = require('./routes/index')
const indexApi = require('./routes/api/index')
const usersApi = require('./routes/api/users')

// error handler
// onerror(app)

// middlewares
app.use(helmet());
app.use(bodyparser())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(__dirname + '/storage'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 错误状态码拦截
app.use(errorHandle)

// Jwt权限验证
app.use(koajwt({
  secret: TokenSecretKey
}).unless({
  path: NoAuthRouters
}));


// app.use(koaBody({
//   multipart: true,
//   encoding: 'gzip',
//   formidable: {
//     uploadDir: path.join(__dirname, 'storage/uploads'),
//     keepExtensions: true,
//     maxFieldsSize: 10 * 1024 * 1024,
//     onFileBegin: (name, file) => {
//       // console.log(file);
//       // 获取文件后缀
//       const ext = getUploadFileExt(file.name);
//       // 最终要保存到的文件夹目录
//       const dir = path.join(__dirname, `storage/uploads/${getUploadDirName()}`);
//       // 检查文件夹是否存在如果不存在则新建文件夹
//       checkDirExist(dir);
//       const dirName = getUploadDirName();
//       const fileName = getUploadFileName(ext);
//       // 重新覆盖 file.path 属性
//       file.path = `${dir}/${fileName}`;
//       app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
//       app.context.uploadpath[name] = `${dirName}/${fileName}`;
//     },
//     onError: (err) => {
//       console.log(err);
//     }
//   }
// }));

// 跨域
app.use(
  cors({
    origin: (ctx) => { //设置允许来自指定域名请求
      return "*"
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

// 路由
app.use(index.routes(), index.allowedMethods())
app.use(indexApi.routes(), indexApi.allowedMethods())
app.use(usersApi.routes(), usersApi.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

connectDB().then(() => {
  console.info("DataBase Connect Success!");
});

module.exports = app
