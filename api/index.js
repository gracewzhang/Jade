const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const apiRoutes = require("./api/routes");
const { errorHandler } = require("./api/middleware");

const app = express();

app.use(session({ secret: "melody hensley is my spirit animal" }));
app.use(helmet());
app.use(cors());

app.use(logger("dev"));

app.use(bodyParser.json({ limit: "2.1mb" }));
app.use(bodyParser.urlencoded({ limit: "2.1mb", extended: false }));

// Mongo setup
require("./api/utils/mongo-setup");

// Routes
app.use("/api", apiRoutes);
app.get("/", (req, res) => res.json("API working!"));
app.get("/favicon.ico", (req, res) => res.status(204));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
