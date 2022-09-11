const db = require("../models");

const Communities = db.communities;
const CommunityType = db.communityType;
const User = db.user;
const Posts = db.posts;


exports.createCommunity = (req, res) => {
  const community = new Communities({
    name: req.body.name,
    createDate: new Date(),
  })

  community.save((err, community) => {
    if(err) {
      res.status(500).send({ message: err });
      return;
    }
    if(req.body.type) {
      CommunityType.find(
        { type: { $in: req.body.type } },
        (err, types) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          community.communitytypes = types.map(type => type._id);
          community.save((err, community) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            if(req.body.user) {
              User.findOne(
                { username: req.body.user },
                (err, user) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }
                  community.users = [user._id];
                  community.save(err => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                    res.status(200).send({ message: "done" });
                  });
                }
              );
            };
          });
        }
      );
    }
  })
}

exports.joinCommunity = async (req, res) => {
  await Communities.findOne(
    { name:  req.body.name}
  )
  .exec((err, community) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(req.body.user) {
      User.findOne(
        { username: req.body.user },
        (err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.communities = [...user.communities, community._id]
          user.save((err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            community.users = [...community.users, user._id]
            community.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.status(200).send({ community: community, user: user });
            });
          })
        }
      )
    }
  })
}
