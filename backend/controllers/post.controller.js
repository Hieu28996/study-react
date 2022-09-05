const db = require("../models");

const Posts = db.posts;
const User = db.user;

exports.allPost = (req, res) => {
  Posts.find({}, (err, posts) => {
    if (err) {
      res.status(500).send('An error occurred', err);
      return;
    }
    else {
      res.status(200).send({ posts: posts });
      return;
    }
  })
};

exports.createPost = (req, res) => {
  const post = new Posts({
    title: req.body.title,
    content: req.body.content,
    interactive: req.body.interactive
  })

  post.save((err, post) => {
    if(err) {
      res.status(500).send({ message: err });
      return;
    }
    if(req.body.author) {
      User.find(
        { username: { $in: req.body.author } },
        (err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          post.author = user.map(user => user._id);
          post.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "Create post successfully!" });
          });
        }
      )
    }
  })
};

exports.deletePost = (req, res) => {
  res.status(200).send("delete post");
};
exports.editPost = (req, res) => {
  res.status(200).send("delete post");
};
