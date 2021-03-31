const nodemailer = require("nodemailer");
const { Mail } = require('../../config');

let smtpSend = async (title, email, content) => {
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
    let info = await transporter.sendMail({
        from: Mail.smtp.from, // sender address
        to: email, // list of receivers
        subject: title, // Subject line
        html: content // html body
    });

    transporter.sendMail(info, (err, info) => {
        if (err) {
            console.log("Error occurred. " + err.message);
        }

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}

module.exports = smtpSend