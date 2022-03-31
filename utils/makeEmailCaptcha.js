const EmailCaptchaModel = require('../model/emailCaptcha');
const sendMail = require('./mail');
const { Mail, EmailVerify } = require('../config');
const { v4: uuidv4 } = require('uuid');

// 生成验证码存储只数据库并发送到指定邮箱
let makeEmailCaptcha = async(userName, email, code_type) => {
    return new Promise(async(resolve, reject) => {
        if (EmailVerify && Mail.Enable) {
            let code = Math.random().toString(36).slice(-8);

            let code_data = {
                id: uuidv4(),
                userName: userName,
                email: email,
                code: code,
                code_type,
            }

            let tempdata = {
                userName,
                code
            }

            let create = await EmailCaptchaModel.create(code_data);

            if (create) {
                await sendMail(code_type === "Register" ? "Verify Email Address" : "iForgot", email, tempdata, code_type === "Register" ? "VerifyEmail" : "iForgot").then(callback => {
                    resolve(callback)
                }).catch(callback => {
                    reject(callback)
                })

            } else {
                console.error("Email Code Make Error.");
                reject({
                    status: false,
                    msg: "Email Code Make Error."
                })
            }
        }
    })
}

module.exports = makeEmailCaptcha