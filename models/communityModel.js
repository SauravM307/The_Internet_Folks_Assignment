const mongoose = require("mongoose");
const slugify = require("slugify");
const generateSnowFlakeID = require("./../utils/generateSlowflakeID");
const communitySchema = new mongoose.Schema({
  _id: { type: String, default: generateSnowFlakeID() },
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  slug: { type: String, unique: true },
  owner: { type: String, ref: "User", required: true },
  created_at: { type: Date, default: new Date(Date.now()) },
  updated_at: { type: Date, default: new Date(Date.now()) },
});
communitySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Community = mongoose.model("Community", communitySchema);
module.exports = Community;
