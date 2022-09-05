const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    status: String,
    avatar:{
      data: Buffer,
      contentType: String
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
