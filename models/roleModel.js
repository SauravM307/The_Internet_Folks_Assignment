const mongoose = require("mongoose");
const generateSlowflakeID = require("./../utils/generateSlowflakeID.js");
const generateSnowFlakeID = require("./../utils/generateSlowflakeID.js");
const roleSchema = new mongoose.Schema({
  _id: { type: String, default: generateSnowFlakeID() },
  name: {
    type: String,
    required: ["true", "Please provide a name for the role!"],
    unique: true,
    validate: {
      validator: function (value) {
        const words = value.split(" ");
        const uniqueWords = new Set(words);
        return uniqueWords.size >= 2;
      },
      message: "name should be atleast 2 characters!",
    },
  },
  created_at: { type: Date, default: new Date(Date.now()) },
  updated_at: { type: Date, default: new Date(Date.now()) },
});
const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
