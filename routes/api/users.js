const router = require('koa-router')()

router.prefix('/api/users')

router.get('/info', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

module.exports = router
