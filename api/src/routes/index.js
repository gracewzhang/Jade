const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureGuest, (req, res) => {
  res.render("login"); // TODO: react router? move middleware to frontend?
});

router.get("/log", ensureAuth, async (req, res) => {
  res.render("index", { userinfo: req.user }); // TODO: react router?
});
router.use("/day", require("./day"));
router.use("/auth", require("./auth"));
router.use("/user", require("./user"));

module.exports = router;
