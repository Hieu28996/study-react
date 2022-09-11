const router = require("express").Router();
const { verifyCommunities } = require("../middlewares");
const controller = require("../controllers/communities.controller.js");

router.post("/create", verifyCommunities.checkDuplicateName, controller.createCommunity);
router.patch("/join", controller.joinCommunity);
module.exports = router;