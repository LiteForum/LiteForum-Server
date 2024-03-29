const mongoose = require("mongoose");
const EmailCaptchaSchema = new mongoose.Schema({
    id: String,
    userName: String,
    email: String,
    code: String,
    code_type: String,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

module.exports = mongoose.model("EmailCaptcha", EmailCaptchaSchema);