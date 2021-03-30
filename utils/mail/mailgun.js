const mailgun = require("mailgun-js");
const { Mail } = require('../../config');

let mailgunSend = (title, email, content) => {
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
        } else {
            console.log(error);
        }
    });
}

module.exports = mailgunSend