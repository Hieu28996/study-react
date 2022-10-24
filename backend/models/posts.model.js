const mongoose = require("mongoose");

const Posts = mongoose.model(
  "Posts",
  new mongoose.Schema({
    title: String,
    content: String,
    interactive: Number,
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    communities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Communities",
    },
    createDate: String,
    image: [String],
  }),
)

module.exports = Posts;
