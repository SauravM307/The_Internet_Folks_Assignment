const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String, default: null },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
    select: false,
  },
  created_at: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  try {
    const res = await bcrypt.compare(candidatePassword, userPassword);
    // console.log(res);
    return res;
  } catch (err) {
    return false;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
