const router = require('koa-router')()
const UserController = require('../../controllers/users/users')

router.prefix('/api')

router.post("/login",UserController.login);
router.post("/register",UserController.register);
router.post("/email/verify/send", UserController.verifyEmailCaptchaSend);
router.post("/iforgot/verify/send", UserController.iForgotCaptchaSend);
router.post("/iforgot", UserController.iForgot);

module.exports = router
