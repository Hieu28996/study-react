const mongoose = require("mongoose");

const Posts = mongoose.model(
  "Posts",
  new mongoose.Schema({
    title: String,
    content: String,
    interactive: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createDate: String,
  }),
)

module.exports = Posts;
