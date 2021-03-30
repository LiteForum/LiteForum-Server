const router = require('koa-router')()
const UserController = require('../../controllers/users')
const path = require('path')

router.prefix('/api/users')

router.get('/info', UserController.getUserInfo);

// 上传暂未完成
// router.post('/avatar/upload', async (ctx) => {
//   // ctx.body = JSON.stringify(ctx.request.files);
// });

module.exports = router
