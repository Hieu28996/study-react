const db = require("../models");

const Communities = db.communities;
const CommunityType = db.communityType;
const User = db.user;

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
                  community.save((err, community) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                    user.communities = [...user.communities, community._id]
                    user.save(err => {
                      if (err) {
                        res.status(500).send({ message: err });
                        return;
                      }

                      res.status(200).send({ message: "done" });
                    })
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

exports.controlCommunity = async (req, res) => {
  await User.findOne(
    { username: req.body.username }
  )
  .exec ((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const hasUser = user.communities.filter(item => item.toString() === req.body.community.toString());
    if(hasUser.length > 0) {
      user.communities = user.communities.filter(item => item.toString() !== req.body.community.toString());
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        Communities.findById(req.body.community, (err, community) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          community.users = community.users.filter(item => item.toString() !== user._id.toString());
          community.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.status(200).send({ message: "Leave community is completed" });
          })
        })
      })
    } else {
      user.communities = [...user.communities, req.body.community]
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        Communities.findById(req.body.community, (err, community) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          community.users = [...community.users, user._id];
          community.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.status(200).send({ message: "Join community is completed" });
          })
        })
      });
    }
  })
}

exports.getType = async (req, res) => {
  await CommunityType.find({})
  .exec((err, types) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    else {
      res.status(200).send({ communitiesType: types });
      return;
    }
  })
}

exports.getCommunityType = async (req, res) => {
  await Communities.find()
  .populate({
    path: "communitytypes",
    match: { type: { $eq: req.params.type } },
  })
  .exec((err, communities) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    communities = communities.filter(community => community.communitytypes.length > 0);
    res.status(200).send({ communities: communities });
  });
}
