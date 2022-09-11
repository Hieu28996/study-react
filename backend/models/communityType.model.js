const mongoose = require("mongoose");

const CommunityType = mongoose.model(
  "CommunityType",
  new mongoose.Schema({
    type: String,
  }),
)

module.exports = CommunityType;