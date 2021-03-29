const router = require('koa-router')()
const UserController = require('../../controllers/users')
const path = require('path')

router.prefix('/api/users')

router.get('/info', UserController.getUserInfo);

router.post('/avatar/upload',async (ctx)=>{
  // console.log(ctx.request.files);
  // console.log(ctx.request.body);
  ctx.body = JSON.stringify(ctx.request.body.filename);
});

module.exports = router
