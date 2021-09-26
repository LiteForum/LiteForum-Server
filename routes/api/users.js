const router = require('koa-router')()
const UserController = require('../../controllers/users/users')
const OAuthController = require('../../controllers/users/oauth');
const path = require('path')

router.prefix('/api/users')

router.get('/info', UserController.getUserInfo);

// OAuth Bind
router.post('/oauth/bind/wechat', OAuthController.wechat_auth);

// OAuth Login
router.post('/oauth/login/wechat', OAuthController.wechat_auth_login);

// OAuth UnBind
router.post('/oauth/unbind/wechat', OAuthController.wechat_auth_unbind);

// 上传暂未完成
// router.post('/avatar/upload', async (ctx) => {
//   // ctx.body = JSON.stringify(ctx.request.files);
// });

module.exports = router
