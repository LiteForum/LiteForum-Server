const mongoose = require("mongoose");
const EmailCaptchaSchema = new mongoose.Schema(
    {
        id: String,
        username: String,
        email: String,
        code: String,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

module.exports = mongoose.model("EmailCaptcha", EmailCaptchaSchema);