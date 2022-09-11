const mongoose = require("mongoose");

const Communities = mongoose.model(
  "Communities",
  new mongoose.Schema({
    name: String,
    communitytypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommunityType",
      }
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
      }
    ],
    createDate: String,
  }),
)

module.exports = Communities;
