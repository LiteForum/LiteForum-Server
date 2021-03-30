const nodemailer = require("nodemailer");
const { Mail } = require('../../config');

let smtpSend = (title, email, content) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: Mail.smtp.host,
        port: Mail.smtp.port,
        secure: Mail.smtp.secure, // true for 465, false for other ports
        auth: {
            user: Mail.smtp.user, // generated ethereal user
            pass: Mail.smtp.password // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: Mail.smtp.from, // sender address
        to: email, // list of receivers
        subject: title, // Subject line
        html: content // html body
    });

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }

        //console.log('Message sent: %s', info.messageId);
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });
}

module.exports = smtpSend