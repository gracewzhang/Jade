const express = require("express");
const router = express.Router();

router.use("/entry", require("./entry"));

module.exports = router;
