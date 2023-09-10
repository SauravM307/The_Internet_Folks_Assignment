const Role = require("./../models/roleModel");
const catchAsync = require("./../utils/catchAsync.js");
const factory = require("./handlerFactory.js");
const APIFeatures = require("./../utils/apiFeatures.js");
exports.create = factory.createOne(Role);
exports.getAll = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Role.find(), req.query).paginate();
  const doc = await features.query;
  const total = await Role.countDocuments();
  const limit = req.query.limit || 100;
  const page = req.query.page || 1;
  const totalPages = Math.ceil(total / limit);
  res.status(200).json({
    status: "true",
    content: {
      meta: {
        total,
        pages: totalPages,
        page,
      },
      data: doc,
    },
  });
});
