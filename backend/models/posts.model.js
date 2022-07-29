const mongoose = require("mongoose");

const Posts = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    countLike: Number,
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
  }),
)

module.exports = Posts;
