const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app.js");
//BRINGING THE DATABASE CONNECTION STRING
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!!!! SHUTTING DOWN.....");
  console.log(err);
  process.exit(1);
});

//CONNECTING TO THE DATABASE ON ATLAS

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB CONNECTION SUCCESSFUL!");
  })
  .catch((err) => {
    console.log(err.name, err.message);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
//HANDLING UNHANDLED REJECTIONS
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!!!! SHUTTING DOWN.....");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
