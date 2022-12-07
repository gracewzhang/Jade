const express = require("express");
const router = express.Router();
const { errorWrap } = require("../middleware");
const User = require("../models/user");

router.get(
  "/",
  errorWrap(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
      message: `Successfully retrieved all users.`,
      success: true,
      result: users,
    });
    return;
  })
);

module.exports = router;
