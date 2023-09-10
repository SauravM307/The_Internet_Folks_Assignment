const memberController = require("./../controllers/memberController.js");
const authController = require("./../controllers/authController.js");
const express = require("express");

const router = express.Router();
router.post(
  "/",
  authController.protect,
  authController.restrictTo("community member", "community moderator"),
  memberController.addMember
);
module.exports = router;
