const router = require('koa-router')()
const UserController = require('../../controllers/users/users')

router.prefix('/api')

module.exports = router