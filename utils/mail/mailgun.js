const mailgun = require("mailgun-js");
const { Mail } = require('../../config');

let mailgunSend = (title, email, content) => {
    return new Promise((resolve, reject) => {
        const data = {
            from: Mail.Mailgun.from,
            to: email,
            subject: title,
            html: content
        };

        const mg = mailgun({ apiKey: Mail.Mailgun.apikey, domain: Mail.Mailgun.domain });
        mg.messages().send(data, (error, body) => {
            if (!error) {
                console.log(body);
                resolve({
                    status: true,
                    msg: "Mail Send Success."
                })
            } else {
                console.log(error);
                reject({
                    status: false,
                    msg: "Mail Send Error."
                })
            }
        });
    })
}

module.exports = mailgunSend