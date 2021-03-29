module.exports = {
    AppKey: "f65c08b4-db7d-41ee-934b-80fd668af505",

    // 密码加盐（请保证此值拥有随机性）
    HashSuffix: "A1GuChlfN9Q4tJeDWIhr",
    // Token签发加密Key（请保证此值拥有随机性）
    TokenSecretKey: "AhzMFWSGrFtQOuzIYJgU",
    // Token有效时长
    ExpiresIn: "2d",

    // 不需要鉴权的路由
    NoAuthRouters: [
        "/",
        /\/api\/register/,
        /\/api\/login/,
        /\/api\/users\/bar/,
    ],

    // 数据库配置
    Mongodb: {
        host: "127.0.0.1",
        port: "27017",
        database: "message",
        username: "",
        password: ""
    },

    Mail: {
        /**
         * 邮件发送配置
         * 在启用此功能之前请确保您的邮件配置正常
         * 并且发件驱动配置无需全部填写，只会生效一个
         */
        Enable: false,
        // 发件驱动（smtp/mailgun）
        Drive: "smtp",

        // 配置SMTP
        smtp: {
            host: "",
            port: 578,
            // 如果为true, 端口请更改为456
            secure: false,
            // 用于SMTP鉴权的用户账户与密码
            user: "",
            password: "",
            // 填写发件人
            from: ""
        },

        // 配置Mailgum
        mailgun: {
            domain: "",
            apikey: "",
            from: ""
        },
    }
}