const cloudinary = require('cloudinary')
const streamifier = require('streamifier')
const db = require("../models");
var bcrypt = require("bcryptjs");

const User = db.user;

cloudinary.config({
  cloud_name: "dur9uryyc",
  api_key: "899725944425354",
  api_secret: "B_rkxqp3N64I9Qr9Y-KsKoVvO6E",
  secure: true
});

exports.uploadAvatar = (req, res, next) => {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  async function upload(req) {
    let result = await streamUpload(req);
    User.findOne(
      { username: req.body.username},
      (err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.avatar = result.url;
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(200).send({ message: "Avatar upload successfully!" });
        })
      }
    )
  }

  upload(req);
}

exports.allAccess = async (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
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
