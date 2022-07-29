const db = require("../models");
var bcrypt = require("bcryptjs");

const User = db.user;

exports.allAccess = async (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred', err);
      return;
    }
    else {
      res.status(200).send({ users: users });
      return;
    }
  })
};
exports.userBoard = async (req, res) => {
  await User.findOne({
    username: req.body.username
  })
  .populate("roles", "-__v")
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      res.status(404).send({ message: "User Not found." });
      return;
    } else {
      res.status(200).send({ user: user });
      return;
    }
  })
};
exports.userEdit = async (req, res) => {
  const update = () => {
    const updateList = {};
    req.body.username && (updateList.username = req.body.newUsername);
    req.body.newPassword && (updateList.password = bcrypt.hashSync(req.body.newPassword, 8));
    req.body.newEmail && (updateList.email = req.body.newEmail);
    req.body.avatar && (updateList.avatar = req.body.newAvatar);
    return updateList;
  }
  const subs = await User.findOneAndUpdate(
    {
      username: req.body.username
    },
    update()
  );
  res.send(subs);
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
