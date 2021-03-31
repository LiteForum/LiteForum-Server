// 邮件模板生成
const fs = require('fs');
const ejs = require("ejs");
const { AppName } = require('../../config');

let temp2html = async (title, content) => {
    console.log(__dirname)
    const fileContent = await new Promise((resolve, reject) => {
        return fs.readFile(__dirname + "/templates/mail.ejs", { encoding: 'utf8' }, (err, data) => {
            return resolve(data);
        });
    });

    let info = {
        title,
        content,
        appname: AppName
    }

    if (fileContent) {
        let template = await ejs.compile(fileContent);
        return await template(info);
    }
}

module.exports = temp2html