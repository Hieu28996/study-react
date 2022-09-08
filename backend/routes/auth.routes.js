const router = require("express").Router();
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller.js");

router.post(
  "/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.post("/refresh", controller.requestRefreshToken);
module.exports = router;