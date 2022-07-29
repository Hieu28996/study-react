const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  if(req.body.newUsername) {
    User.findOne({
      username: req.body.newUsername,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
      }

      next();
    });
  }

  // Email
  if(req.body.newEmail) {
    User.findOne({
      email: req.body.newEmail,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
  
      next();
    });
  }
};

const verifyEditUser = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifyEditUser
