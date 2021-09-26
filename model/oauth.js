const mongoose = require("mongoose");
const OAuthSchema = new mongoose.Schema(
    {
        id: String,
        wechat: {
            type: Object,
            default: {
                openid: "",
                unionid: "",
                sessionkey: "",
            }
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

module.exports = mongoose.model("OAuth", OAuthSchema);