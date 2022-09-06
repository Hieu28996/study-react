var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.user;
const Role = db.role;

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, admin: user.admin }, process.env.JWB_ACCESS_KEY, {
    expiresIn: "30s"
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, admin: user.admin }, process.env.JWB_REFRESH_KEY, {
    expiresIn: "365d"
  });
};

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
exports.signin = async (req, res) => {
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
      return res.status(404).send({ message: "User Not found." });
    }
    let passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    if(user && passwordIsValid) {
      const token = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      const { password, ...others} = user._doc;
      res.status(200).send({
        ...others,
        accessToken: token
      });
    }
    let authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
  });
};

exports.requestRefreshToken = async (req, res) => {
  var refreshToken = req.cookies.refreshToken;
  if(!refreshToken) {
    res.status(401).json("You're not authenticated");
  }
  jwt.verify(refreshToken, process.env.JWB_REFRESH_KEY, (err, user) => {
    if(err) {
      res.status(500).send({ message: err });
      return;
    }
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).send({
      accessToken: newAccessToken
    });
  })
}