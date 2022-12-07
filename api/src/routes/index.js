const express = require("express");
const router = express.Router();

router.use("/day", require("./day"));

module.exports = router;
