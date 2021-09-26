const jwt = require("jsonwebtoken")
const { TokenSecretKey, ExpiresIn } = require("../../config")
const UserModel = require('../../model/users')
const OAuthModel = require('../../model/oauth')
const wechatmini = require('../../utils/auth/wechat_miniprogram')

module.exports = {
    async wechat_auth(ctx) {
        const { code } = ctx.request.body

        await wechatmini(code).then(async (res) => {
            if (res.errcode && res.errcode !== 0) {
                ctx.fail("Bind Failed. Code Not Found.", -1)
            } else {
                let db = await OAuthModel.findOne({ id: ctx.state.user.id })
                if (Object.keys(db.wechat).length === 0 || (db.wechat.openid === "" && db.wechat.unionid === "" && db.wechat.sessionkey === "")) {
                    let wechat = {
                        openid: res.openid,
                        unionid: res.unionid ? res.unionid : "",
                        sessionkey: res.session_key
                    }

                    let db2 = await OAuthModel.findOneAndUpdate({ id: ctx.state.user.id }, { $set: { wechat: wechat } }, { multi: true })

                    if (db2) {
                        ctx.success({}, "Bind Success.")
                    } else {
                        ctx.fail({}, "Bind Failed.", -1)
                    }

                } else {
                    ctx.fail("Bind Failed. This Account is Bind Wechat.", -1)
                }
            }
        }).catch(() => {
            ctx.fail("Bind Failed. WeChat OAuth Error.", -1)
        })
    },

    async wechat_auth_unbind(ctx) {
        const { code } = ctx.request.body

        await wechatmini(code).then(async (res) => {
            if (res.errcode && res.errcode !== 0) {
                ctx.fail("UnBind Failed. Code Not Found.", -1)
            } else {
                let db = await OAuthModel.findOne({ id: ctx.state.user.id })
                console.log(db)

                if (db.wechat.openid !== "" || db.wechat.unionid !== "" || db.wechat.sessionkey !== "") {
                    let db2 = await OAuthModel.updateOne({ id: ctx.state.user.id }, { $set: { wechat: {} } })

                    if (db2) {
                        ctx.success({}, "UnBind Success.")
                    } else {
                        ctx.fail("UnBind Failed.", -1)
                    }
                } else {
                    ctx.fail("UnBind Failed. This Account is No Bind Wechat.", -1)
                }
            }
        }).catch(() => {
            ctx.fail("UnBind Failed. Wechat OAuth Error.", -1)
        })
    },

    async wechat_auth_login(ctx) {
        const { code } = ctx.request.body

        await wechatmini(code).then(async (res) => {
            if (res.errcode && res.errcode !== 0) {
                ctx.fail("Login Failed. Code Not Found.", -1)
            } else {
                let db = await OAuthModel.findOne({ 'wechat.openid': res.openid })
                if (db !== null || ((db.wechat.openid !== "" || db.wechat.unionid !== "") && db.wechat.sessionkey !== "")) {
                    let db2 = await UserModel.findOneAndUpdate({ id: db.id }, { last_online: new Date().getTime() })

                    if (db2) {
                        const user = { id: db2.id, username: db2.username, authority: db2.authority }
                        const token = jwt.sign(user, TokenSecretKey, { expiresIn: ExpiresIn })
                        ctx.success({
                            token: token
                        }, "Login Success.")
                    } else {
                        ctx.fail("Login Failed. User Not Found.", -1)
                    }
                } else {
                    ctx.fail("Login Failed. WeChat Not Bind.", -1)
                }
            }
        }).catch(() => {
            ctx.fail("Login Failed. WeChat OAuth Error.", -1)
        })
    }
}