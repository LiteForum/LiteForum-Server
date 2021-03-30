const { Mail } = require('../../config');
const temp2html = require('./template');
const smtpSend = require('./smtp');
const mailgunSend = require('./mailgun');

// 邮件发送模块
let sendMail = async (title, email, content) => {
    let tempdata = await temp2html(title, content);
    
    if (Mail.Enable && tempdata !== false) {
        if (Mail.Drive === 'smtp') {
            smtpSend(title, email, tempdata);
        }

        if (Mail.Drive === 'mailgun') {
            mailgunSend(title, email, tempdata);
        }
    } else {
        console.error("Mail module not open.");
    }
}

module.exports = sendMail