const router = require('koa-router')()
const res_state = require('../../utils/response')
const UserController = require('../../controllers/users')

router.prefix('/api')

router.post("/login",UserController.login);
router.post("/register",UserController.register);

module.exports = router
