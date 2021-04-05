const mailgun = require("mailgun-js");
const { Mail } = require('../../config');

let mailgunSend = (title, email, content) => {
    return new Promise((resolve, reject) => {
        const data = {
            from: Mail.mailgun.from,
            to: email,
            subject: title,
            html: content
        };

        const mg = mailgun({ apiKey: Mail.mailgun.apikey, domain: Mail.mailgun.domain });
        mg.messages().send(data, function (error, body) {
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