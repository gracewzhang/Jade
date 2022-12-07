const express = require("express");
const passport = require("passport");
const router = express.Router();
const { errorWrap } = require("../middleware");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/api/log");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/api");
});

module.exports = router;
