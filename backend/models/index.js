const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.user = require("./user.model");
db.role = require("./role.model");
db.posts = require("./posts.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;