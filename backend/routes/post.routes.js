const router = require("express").Router();
// const { authJwt, verifyEditUser } = require("../middlewares");
const controller = require("../controllers/post.controller");
const multer = require("multer");
const fileUpload = multer();

router.post("/create",fileUpload.array('file'),
  controller.createPost);

// router.get("/all", authJwt.verifyToken, controller.allPost);
router.get("/all", controller.allPost);

module.exports = router;
