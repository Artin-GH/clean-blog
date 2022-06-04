const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const {staticFolderPath} = require('./config/constants');

const routers = {
  main: require("./app/routes/main.route"),
  posts: require("./app/routes/posts.route"),
  manage: require("./app/routes/manage.route"),
};

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(staticFolderPath));
app.use(fileUpload());

app.use("/", routers.main);
app.use("/posts", routers.posts);
app.use("/manage", routers.manage);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
