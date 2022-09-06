const router = require("express").Router();
const { authJwt, verifyEditUser } = require("../middlewares");
const controller = require("../controllers/post.controller");

router.post("/create",
  authJwt.verifyToken,
  controller.createPost);

router.get("/all", authJwt.verifyToken, controller.allPost);

module.exports = router;
