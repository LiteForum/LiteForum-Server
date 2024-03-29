const nodemailer = require("nodemailer");
const { Mail } = require('../../config');

let smtpSend = async (title, email, content) => {
    return new Promise(async (resolve, reject) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: Mail.Stmp.host,
            port: Mail.Smtp.port,
            secure: Mail.Smtp.secure, // true for 465, false for other ports
            auth: {
                user: Mail.Smtp.user, // generated ethereal user
                pass: Mail.Smtp.password // generated ethereal password
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: Mail.Smtp.from, // sender address
            to: email, // list of receivers
            subject: title, // Subject line
            html: content // html body
        });

        transporter.sendMail(info, (err, info) => {
            if (err) {
                console.log("Error occurred. " + err.message);
                reject({
                    status: false,
                    msg: "Mail Send Error."
                })
            } else {
                resolve({
                    status: true,
                    msg: "Mail Send Success."
                })
            }

            console.log("Message sent: %s", info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        });
    })
}

module.exports = smtpSend