const Member = require("./../models/memberModel.js");
const catchAsync = require("./../utils/catchAsync.js");
const factory = require("./handlerFactory.js");

exports.addMember = catchAsync(async (req, res, next) => {
  const doc = await Member.create(req.body);
  res.status(200).json({
    status: "true",
    content: {
      data: {
        doc,
      },
    },
  });
});
