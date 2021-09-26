const request = require('request')
const { Auth } = require('../../config')
const wxmini = Auth.Wechat_MiniProgram

let wechat_auth = async (js_code) => {
    return await new Promise((resolve, reject) => {
        if (wxmini.Enable) {
            request(`https://api.weixin.qq.com/sns/jscode2session?appid=${wxmini.AppID}&secret=${wxmini.AppSecret}&js_code=${js_code}&grant_type=authorization_code`, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    reject()
                }
            })
        } else {
            reject()
        }
    })
}

module.exports = wechat_auth