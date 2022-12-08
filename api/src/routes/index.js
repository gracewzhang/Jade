const express = require("express");
const router = express.Router();
const { errorWrap, ensureAuth, ensureGuest } = require("../middleware");

router.get("/", ensureGuest, (req, res) => {
  res.status(200).json({
    message: "Successfully logged in or something",
    success: true,
    result: "um",
  });
  // res.render('login') <-- login page
});

router.get("/log", ensureAuth, async (req, res) => {
  res.status(200).json({
    message: "Successfully arrived at /log apparently",
    success: true,
    result: req.user,
  });
  // res.render('index',{userinfo:req.user}) <-- main page, after user login
});
router.use("/day", require("./day"));
router.use("/auth", require("./auth"));
router.use("/user", require("./user"));

module.exports = router;
