const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: String,
    email: String,
    username: String,
    password: String,
    role: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
