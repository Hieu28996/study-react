const router = require("express").Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

router.get("/all", controller.allPost);
router.get("/post", authJwt.verifyToken, controller.getPost);
router.post("/create", authJwt.verifyToken, controller.createPost);
router.delete("/delete", authJwt.verifyToken, controller.deletePost);

module.exports = router;
