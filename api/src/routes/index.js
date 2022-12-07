const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureGuest, (req, res) => {
  res.render("login");
});

router.get("/log", ensureAuth, async (req, res) => {
  res.render("index", { userinfo: req.user });
});
router.use("/day", require("./day"));
router.use("/auth", require("./auth"));
router.use("/user", require("./user"));

module.exports = router;
