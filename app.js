const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const roleRouter = require("./routes/roleRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const cookieParser = require("cookie-parser");
const communityRouter = require("./routes/communityRoutes.js");
const memberRouter = require("./routes/memberRoutes.js");
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(cookieParser());
// app.use("/api/v1/role", roleRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/community", communityRouter);
app.use("/api/v1/member", memberRouter);
module.exports = app;
