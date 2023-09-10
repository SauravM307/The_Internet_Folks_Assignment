const catchAsync = require("./../utils/catchAsync.js");
const AppError = require("./../utils/appError.js");
const APIFeatures = require("./../utils/apiFeatures.js");
exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError("No Document found with that ID!", 404));
    }
    res.status(200).json({
      status: "true",
      content: {
        data: {
          doc,
        },
      },
    });
  });
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "true",
      content: {
        data: { doc },
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query).paginate();
    const doc = await features.query;
    res.status(200).json({
      status: "true",
      data,
    });
  });
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document with that ID!", 404));
    }
    res.status(200).json({
      status: "true",
      content: { doc },
    });
  });
