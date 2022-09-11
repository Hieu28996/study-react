const db = require("../models");
const Communities = db.communities;

checkDuplicateName = (req, res, next) => {
  if(req.body.name) {
    Communities.findOne(
      {name : req.body.name}
    ).exec((err, community) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (community) {
        res.status(400).send({ message: "Failed! Community is already in use!" });
        return;
      }

      next();
    });
  }
}

const verifyCommunities = {
  checkDuplicateName,
};

module.exports = verifyCommunities
