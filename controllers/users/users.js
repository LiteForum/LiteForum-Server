const jwt = require("jsonwebtoken")
const UserModel = require('../../model/users')
const OAuthModel = require('../../model/oauth')
const EmailCaptchaModel = require('../../model/emailCaptcha')
const sha256 = require('../../utils/sha256')
const HashSuffix = require('../../config')
const { TokenSecretKey, ExpiresIn, EmailVerify } = require("../../config")
const { v4: uuidv4 } = require('uuid')
const makeEmailCaptcha = require('../../utils/makeEmailCaptcha')


module.exports = {
    async login(ctx) {
        const { username, email, password } = ctx.request.body

        username_re = new RegExp("[`~!@#$^&*()=|{}':',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")

        // 用户名特殊字符
        if (username_re.test(username)) {
            ctx.fail('The user name cannot have special characters.', -1)
        }

        let result = await UserModel.findOne({ $or: [{ username }, { email }] })

        // 用户不存在
        if (!result) {
            ctx.fail('User Not Found.', -1)
        } else

            // 密码不正确
            if (sha256(password + HashSuffix) !== result.password) {
                ctx.fail('Password Error.', -1)
            } else {
                await UserModel.updateOne({ $or: [{ username }, { email }] }, { last_online: new Date().getTime() })
                const user = { id: result.id, username: result.username, authority: result.authority }
                const token = jwt.sign(user, TokenSecretKey, { expiresIn: ExpiresIn })
                ctx.success({
                    token: token
                })
            }
    },

    // 发送注册验证码
    async verifyEmailCaptchaSend(ctx) {
        const { username, email } = ctx.request.body

        if (username && email) {
            let result = await EmailCaptchaModel.findOne({ $or: [{ username }, { email }] })
            if (result) {
                await EmailCaptchaModel.findOneAndRemove({ $or: [{ username }, { email }] })
            }

            await makeEmailCaptcha(username, email, "Register").then(callback => {
                ctx.success({}, 'Email Send Success.')
            }).catch(callback => {
                ctx.fail('Email Send Error.', -1)
            })
        } else {
            ctx.fail('Missing parameter.', -1)
        }
    },

    // 发送找回密码验证码
    async iForgotCaptchaSend(ctx) {
        const { email } = ctx.request.body

        if (email) {
            let result = await EmailCaptchaModel.findOne({ email })
            if (result) {
                await EmailCaptchaModel.findOneAndRemove({ email })
            }

            await makeEmailCaptcha(null, email, "iForgot").then(callback => {
                ctx.success({}, 'Email Send Success.')
            }).catch(callback => {
                ctx.fail('Email Send Error.', -1)
            })
        } else {
            ctx.fail('Missing parameter.', -1)
        }
    },

    async iForgot(ctx) {
        const { email, code, password } = ctx.request.body
        if (email, code, password) {
            let result = await EmailCaptchaModel.findOneAndRemove({ $or: [{ email }, { code }] })

            if (result) {
                let result2 = await UserModel.findOneAndUpdate(email, { password: sha256(password + HashSuffix) })
                if (result2) {
                    ctx.success({}, 'Password reset successful.')
                } else {
                    ctx.fail('Password reset failed.', -1)
                }
            } else {
                ctx.fail("Validation failed", -1)
            }
        } else {
            ctx.fail('Missing parameter.', -1)
        }
    },

    async register(ctx) {
        const { username, email, password, code } = ctx.request.body

        email_re = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/

        username_re = new RegExp("[`~!@#$^&*()=|{}':',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")

        if (username_re.test(username)) {
            ctx.fail("The user name cannot have special characters.", -1)
        } else if (username.length < 4) {
            ctx.fail("The length of user name must be more than 4 digits.", -1)
        } else if (password.length < 6) {
            ctx.fail("The length of password must be more than 6 digits.", -1)
        } else if (!email_re.test(email)) {
            ctx.fail("Incorrect email address format.", -1)
        } else {
            let user_find = await UserModel.findOne({ username })

            if (user_find) {
                ctx.fail("User already exists.", -1)
            }

            let email_find = await UserModel.findOne({ email })
            console.log(email_find)

            if (email_find) {
                ctx.fail("Email address registered.", -1)
            }

            let id = uuidv4()

            if (!user_find && !email_find) {
                let user_data = {
                    id: id,
                    username: username,
                    email: email,
                    password: sha256(password + HashSuffix),
                    avatar: null,
                    email_verify: false,
                    last_online: new Date().getTime(),
                    authority: 0,
                }

                let code_find = await EmailCaptchaModel.findOneAndRemove({ code })

                if (EmailVerify && !code_find) {
                    ctx.fail("Validation failed, code does not exist.", -1)
                } else {
                    user_data.email_verify = true
                }

                let create = await UserModel.create(user_data)
                await OAuthModel.create({
                    id: id,
                })

                if (create) {
                    ctx.success({}, "register was successful.")
                } else {
                    ctx.fail("register has failed.", -1)
                }
            }
        }
    },

    async getUserInfo(ctx) {
        const { username } = ctx.query

        if (username) {
            let result = await UserModel.findOne({ username }, { password: 0, email: 0, __v: 0, _id: 0 })
            if (result) {
                ctx.success(result, "Request successful.")
            } else {
                ctx.fail("User Not Found.", -1)
            }
        } else {
            if (ctx.request.header.authorization) {
                let token = ctx.request.header.authorization.split(" ")
                await jwt.verify(token[1], TokenSecretKey, async (err, decoded) => {
                    if (decoded) {
                        let result = await UserModel.findOne({ username: decoded.username }, { password: 0, email: 0, __v: 0, _id: 0 })

                        if (result) {
                            ctx.success(result, "Request successful.")
                        }
                    }

                    if (err) {
                        ctx.fail("Missing parameter or token invalid.", -1)
                    }
                })
            } else {
                ctx.fail('Missing parameter.', -1)
            }
        }
    },
}