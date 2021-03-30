const jwt = require("jsonwebtoken");
const UserModel = require('../model/users');
const res_state = require('../utils/response');
const sha256 = require('../utils/sha256');
const HashSuffix = require('../config');
const { TokenSecretKey, ExpiresIn } = require("../config");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async login(ctx) {
        const { username, email, password } = ctx.request.body;

        let result = await UserModel.findOne({ $or: [{ username }, { email }] });

        username_re = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");

        // 用户名特殊字符
        if(username_re.test(username)) {
            return (ctx.body = res_state(false, "The user name cannot have special characters.", {}));
        }

        // 用户不存在
        if (!result) {
            return (ctx.body = res_state(false, "User Not Found.", {}));
        }

        // 密码不正确
        if (sha256(password + HashSuffix) !== result.password) {
            ctx.status = 400;

            return (ctx.body = res_state(false, "Password Error.", {}));
        }

        const user = { username: result.username, authority: result.authority };
        const token = jwt.sign(user, TokenSecretKey, { expiresIn: ExpiresIn });

        ctx.body = res_state(true, null, {
            token: token
        });
    },

    async register(ctx) {
        const { username, email, password } = ctx.request.body;

        email_re = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;

        username_re = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");

        if(username_re.test(username)) {
            return (ctx.body = res_state(false, "The user name cannot have special characters.", {}));
        }

        // 用户名小于4位
        if (username.length < 4) {
            return (ctx.body = res_state(false, "The length of user name must be more than 4 digits.", {}));
        }

        // 密码小于6位
        if (password.length < 6) {
            return (ctx.body = res_state(false, "The length of password must be more than 6 digits.", {}));
        }

        console.log(email_re.test(email));

        if (!email_re.test(email)) {
            return (ctx.body = res_state(false, "Incorrect email address format.", {}));
        }

        let user_find = await UserModel.findOne({ username });

        if (user_find) {
            return (ctx.body = res_state(false, "User already exists.", {}));
        }

        let email_find = await UserModel.findOne({ email });
        console.log(email_find)

        if (email_find) {
            return (ctx.body = res_state(false, "Email address registered.", {}));
        }

        let user_data = {
            id: uuidv4(),
            username: username,
            email: email,
            password: sha256(password + HashSuffix),
            avatar: null,
            email_verify: false,
            last_online: new Date().getTime(),
            authority: 0,
        }

        let create = await UserModel.create(user_data);

        if (create) {
            ctx.body = res_state(true, "register was successful.", {});
        } else {
            ctx.body = res_state(false, "register has failed.", {});
        }
    },

    async getUserInfo(ctx) {
        const { username } = ctx.query;

        if (username) {
            let result = await UserModel.findOne({ username }, { password: 0, email: 0, __v: 0, _id: 0 });
            if (result) {
                ctx.body = res_state(true, "Request successful.", result);
            } else {
                return (ctx.body = res_state(false, "User Not Found.", {}));
            }
        } else {
            ctx.body = res_state(false, "Missing parameter.", {});
        }
    }
}