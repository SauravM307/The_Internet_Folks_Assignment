const mongoose = require("mongoose");
const generateSnowFlakeID = require("./../utils/generateSlowflakeID");
const memberSchema = new mongoose.Schema({
  _id: { type: String, default: generateSnowFlakeID() },
  community: { type: String, ref: "Community" },
  user: { type: String, ref: "User" },
  role: { type: String, ref: "Role" },
  created_at: { type: Date, default: new Date(Date.now()) },
});

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
