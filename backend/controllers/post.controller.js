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

exports.getPost = async (req, res) => {
  await Posts.findOne({ _id: req.body.id })
  .exec((err, post) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!post) {
      res.status(404).send({ message: "post Not found." });
      return;
    } else {
      res.status(200).send({ post: post });
      return;
    }
  })
};

exports.createPost = (req, res) => {
  const post = new Posts({
    title: req.body.title,
    content: req.body.content,
    countLike: req.body.countLike
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

exports.deletePost = async (req, res) => {
  await Posts.findOne(
    { _id: req.body.id},
    (err, post) => {
      if(err) {
        res.status(500).send({ message: err });
        return;
      }
      if(!post) {
        res.status(500).send({ message: "Don't find the post"});
        return;
      } else {
        post.remove(err => {
          if(err) {
            res.status(500).send({ message: err });
          }
        })
        res.status(200).send({ message: "Delete post successfully!" });
        return;
      }
    });
};
exports.editPost = (req, res) => {
  res.status(200).send("delete post");
};
