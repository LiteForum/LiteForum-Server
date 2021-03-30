const router = require('koa-router')()
const UserController = require('../../controllers/users')

router.prefix('/api')

router.post("/login",UserController.login);
router.post("/register",UserController.register);
router.post("/email/verify", UserController.verifyEmailCaptcha);

module.exports = router
