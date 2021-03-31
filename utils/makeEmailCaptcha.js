const EmailCaptchaModel = require('../model/emailCaptcha');
const sendMail = require('./mail');
const { Mail, EmailVerify } = require('../config');
const { v4: uuidv4 } = require('uuid');

// 生成验证码存储只数据库并发送到指定邮箱
let makeEmailCaptcha = async (username, email) => {
    if (EmailVerify && Mail.Enable) {
        let code = Math.random().toString(36).slice(-8);

        let code_data = {
            id: uuidv4(),
            username: username,
            email: email,
            code: code
        }

        let create = await EmailCaptchaModel.create(code_data);

        if (create) {
            await sendMail("Verify Email Address", email, "Your verification code is: " + code);
        } else {
            console.error("Email Code Make Error.");
        }
    }
}

module.exports = makeEmailCaptcha