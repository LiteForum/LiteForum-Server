// 邮件模板生成
const fs = require('fs');
const ejs = require("ejs");

let temp2html = async (title, content) => {
    const fileContent = await new Promise((resolve, reject) => {
        return fs.readFile("./utils/mail/templates/mail.ejs", { encoding: 'utf8' }, (err, data) => {
            return resolve(data);
        });
    });

    let info = {
        title,
        content
    }

    if (fileContent) {
        let template = await ejs.compile(fileContent);
        return await template(info);
    }
}

module.exports = temp2html