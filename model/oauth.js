const mongoose = require("mongoose");
const OAuthSchema = new mongoose.Schema(
    {
        id: String,
        wechatopenid: {
            type: String,
            default: "",
        },
        wechatunionid: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

module.exports = mongoose.model("OAuth", OAuthSchema);