const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema(
    {
        id: String,
        username: String,
        email: String,
        avatar: String,
        password: String,
        email_verify: Boolean,
        last_online: Date,
        createdAt: Date,
        updatedAt: Date,
        authority: Number,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

module.exports = mongoose.model("User", UsersSchema);