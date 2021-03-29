const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
// const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const connectDB = require("./db/mongoose")
const koajwt = require('koa-jwt')
const { TokenSecretKey, NoAuthRouters } = require('./config');
const errorHandle = require('./utils/errorHandle');

const index = require('./routes/index')
const indexApi = require('./routes/api/index')
const usersApi = require('./routes/api/users')

// error handler
// onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

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

app.use(errorHandle)

// routes
app.use(koajwt({
  secret: TokenSecretKey
}).unless({
  path: NoAuthRouters
}));

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
