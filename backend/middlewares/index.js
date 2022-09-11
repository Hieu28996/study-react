const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyEditUser = require("./verifyEditUser");
const verifyCommunities = require("./verifyCommunity");
module.exports = {
  authJwt,
  verifySignUp,
  verifyEditUser,
  verifyCommunities
};