const catchAsync = require("../utils/catchAsync.js");
const Community = require("./../models/communityModel.js");
const Role = require("./../models/roleModel.js");
const factory = require("./handlerFactory.js");

exports.owner = catchAsync(async (req, res, next) => {
  req.body.owner = req.user._id;
  //   console.log(typeof req.body.owner);

  //   console.log(doc);
  next();
});

exports.create = factory.createOne(Community);
