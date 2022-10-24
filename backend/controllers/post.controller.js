const db = require("../models");
const cloudinary = require('cloudinary')
const streamifier = require('streamifier')

const Posts = db.posts;
const User = db.user;
const Communities = db.communities;

exports.allPost = async (req, res) => {
  await Posts.find()
  .populate("users")
  .populate("communities")
  .exec((err, post) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    else {
      res.status(200).send({ posts: post });
      return;
    }
  })
};

exports.createPost = (req, res) => {
  const post = new Posts({
    title: req.body.title,
    content: req.body.content,
    interactive: req.body.interactive,
    createDate: new Date(),
  })

  const streamUpload = (file) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve({result: result.url});
            } else {
              reject(error);
            }
          }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
    });
  };
  const filesUpload = [];

  const upload = async (req) => {
    for (const file of req.files){
      const result = await streamUpload(file);
      filesUpload.push(result.result)
    }
  }


  post.save(async (err, post) => {
    if(err) {
      res.status(500).send({ message: err });
      return;
    }
    await upload(req)
    if(req.body.author) {
      User.findOne(
        { username: req.body.author }
      )
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        post.users = user._id;
        post.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if(req.body.community) {
            Communities.findOne(
              { name: req.body.community},
              (err, community) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
                if(filesUpload.length) {
                  filesUpload.map(item => post.image.push(item));
                }
                post.communities = community._id;
                post.save(err => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                  res.send({ post: post });
                })
              }
            )
          }
        });
      })
    }
  })
};

exports.deletePost = (req, res) => {
  res.status(200).send("delete post");
};
exports.editPost = (req, res) => {
  res.status(200).send("delete post");
};
