const User = require("./../models/userModel.js");
const catchAsync = require("./../utils/catchAsync.js");
const factory = require("./handlerFactory.js");
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

//USING FACTORY FUNCTIONS
exports.getUser = factory.getOne(User);
