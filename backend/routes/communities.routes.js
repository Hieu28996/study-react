const router = require("express").Router();
const { verifyCommunities } = require("../middlewares");
const controller = require("../controllers/communities.controller.js");

router.post("/create", verifyCommunities.checkDuplicateName, controller.createCommunity);
router.patch("/control", controller.controlCommunity);
router.get("/gettype", controller.getType);
router.get("/:type", controller.getCommunityType);
module.exports = router;