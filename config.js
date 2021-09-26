module.exports = {
    AppName: "Lite",
    AppKey: "f65c08b4-db7d-41ee-934b-80fd668af505",

    // 密码加盐（请保证此值拥有随机性）
    HashSuffix: "A1GuChlfN9Q4tJeDWIhr",
    // Token签发加密Key（请保证此值拥有随机性）
    TokenSecretKey: "AhzMFWSGrFtQOuzIYJgU",
    // Token有效时长
    ExpiresIn: "2d",
    // 是否需要邮件验证
    EmailVerify: true,

    // 不需要鉴权的路由
    NoAuthRouters: [
        "/",
        /\/storage/,
        /\/uploads/,
        /\/uploads\/(.*)/,
        /\/api\/email\/verify/,
        /\/api\/iforgot/,
        /\/api\/iforgot\/(.*)/,
        /\/api\/register/,
        /\/api\/login/,
        /\/api\/users\/oauth\/login\/(.*)/,
        /\/api\/users\/info/,
    ],

    // 数据库配置
    Mongodb: {
        host: "127.0.0.1",
        port: "27017",
        database: "message",
        username: "root",
        password: "Alvin233"
    },

    Mail: {
        /**
         * 邮件发送配置
         * 在启用此功能之前请确保您的邮件配置正常
         * 并且发件驱动配置无需全部填写，只会生效一个
         */
        Enable: true,
        // 发件驱动（smtp/mailgun）
        Drive: "mailgun",

        // 配置SMTP
        Smtp: {
            host: "",
            port: 578,
            // 如果为true, 端口请更改为456 （默认578）
            secure: false,
            // 用于SMTP鉴权的用户账户与密码
            user: "",
            password: "",
            // 填写发件人
            from: ""
        },

        // 配置Mailgum
        Mailgun: {
            domain: "sp.kilins.com",
            apikey: "key-1deb9b49d17e85af42c3b731e0bb68f6",
            from: "noreply@kilins.com"
        },
    },

    // 第三方登入配置
    Auth: {
        // 微信小程序授权登入基本配置
        Wechat_MiniProgram: {
            Enable: true,
            AppID: "wxae5993309bc59354",
            AppSecret: "684f1d7824e8d0a219a325b5238c3e1d"
        },
    },

    Storage: {
        // 存储驱动(local/其他暂未开发)
        Drive: "local",
    },
}