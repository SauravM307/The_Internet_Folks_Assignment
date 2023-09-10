const express = require("express");

const router = express.Router();
const authController = require("./../controllers/authController.js");
const userController = require("./../controllers/userController.js");
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);
module.exports = router;
