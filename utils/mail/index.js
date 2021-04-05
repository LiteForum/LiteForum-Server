const { Mail } = require('../../config');
const temp2html = require('./template');
const smtpSend = require('./smtp');
const mailgunSend = require('./mailgun');

// 邮件发送模块
let sendMail = async (title, email, content, templatename) => {
    return new Promise(async (resolve, reject) => {
        let tempdata = await temp2html(title, templatename, content);

        if (Mail.Enable && tempdata !== false) {
            if (Mail.Drive === 'smtp') {
                smtpSend(title, email, tempdata).then(callback => {
                    resolve(callback.msg)
                }).catch(callback => {
                    reject(callback.msg)
                })
            }

            if (Mail.Drive === 'mailgun') {
                mailgunSend(title, email, tempdata).then(callback => {
                    resolve(callback.msg)
                }).catch(callback => {
                    reject(callback.msg)
                })
            }
        } else {
            console.error("Mail module not open.");
            reject({
                status: false,
                msg: "Mail module not open."
            })
        }
    })
}

module.exports = sendMail