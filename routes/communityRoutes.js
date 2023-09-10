const express = require("express");
const communityController = require("./../controllers/communityController.js");
const authController = require("./../controllers/authController.js");
const router = express.Router();

router.post(
  "/",
  authController.protect,
  communityController.owner,
  communityController.create
);
module.exports = router;
