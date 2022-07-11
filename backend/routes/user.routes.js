const router = require("express").Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

router.get("/all", controller.allAccess);
router.get("/user", [authJwt.verifyToken], controller.userBoard);
router.get(
  "/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);
router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);
module.exports = router;