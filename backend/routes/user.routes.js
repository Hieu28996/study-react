const router = require("express").Router();
const { authJwt, verifyEditUser } = require("../middlewares");
const controller = require("../controllers/user.controller");
const multer = require("multer");
const fileUpload = multer();

router.get("/all", controller.allAccess);
router.post("/user", controller.userBoard);
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
router.patch(
  "/user/update",
  [authJwt.verifyToken, verifyEditUser.checkDuplicateUsernameOrEmail],
  controller.userEdit
);
router.post(
  "/upload",
  fileUpload.single("file"),
  controller.uploadAvatar
)
module.exports = router;