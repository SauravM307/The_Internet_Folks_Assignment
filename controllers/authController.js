const jwt = require("jsonwebtoken");
const User = require("./../models/userModel.js");
const crypto = require("crypto");
const catchAsync = require("./../utils/catchAsync.js");
const generateSnowFlakeID = require("./../utils/generateSlowflakeID.js");
const AppError = require("./../utils/appError.js");
const { promisify } = require("util");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "true",
    content: {
      data: {
        user,
      },
    },
    meta: {
      access_token: token,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    _id: generateSnowFlakeID(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created_at: new Date(Date.now()),
  });
  createSendToken(newUser, 201, res);
});
exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email, password);
  //1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Incorrect Email or Password", 401));
  }
  //2) Check if user exists and password is correct
  const user = await User.findOne({
    email,
  }).select("+password");
  // console.log(user.password);
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));
  //3)If everything is ok,send token to client
  createSendToken(user, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }
  //2) Verifying the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3)check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to the token does no longer exist", 401)
    );
  }
  //4)Grant acccess to the protected route
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action!", 403)
      );
    }
    next();
  };
};
