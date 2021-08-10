const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("./models/db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// "mongodb://localhost:27017/test"

// var mongoDB = "mongodb://localhost:27017/test";
// mongoose.connect(mongoDB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connected error: "));
// db.once("open", function () {
//   console.log("Application connected to mLab MongoDB instance");
// });

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
