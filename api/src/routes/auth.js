const express = require("express");
const passport = require("passport");
const router = express.Router();
const { errorWrap } = require("../middleware");
const User = require("../models/user");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api" }),
  (req, res) => {
    res.redirect("/log");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/api");
});

module.exports = router;
