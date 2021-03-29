const mongoose = require("mongoose");
const UsersSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    avatar: String,
    password: String,
    email_verify: Boolean,
    create_time: Number,
    last_online: Number,
    authority: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

module.exports = mongoose.model("User", UsersSchema);