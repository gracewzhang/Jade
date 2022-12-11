const express = require("express");
const router = express.Router();
const { errorWrap } = require("../middleware");
const User = require("../models/user");

/**
 * Return all users
 */
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

/**
 * Create a new user
 */
router.post(
  "/",
  errorWrap(async (req, res) => {
    const newUser = await User.create(req.body);
    if (newUser) {
      newUser = await User.findById(newUser._id); 
      res.status(200).json({
        message: "Successfully created new user",
        success: true,
        result: newUser,
      });
    }
  })
);

/**
 * Return a user by google id
 */
router.get(
  "/:googleId",
  errorWrap(async (req, res) => {
    const user = await User.find({
      google_id: req.params.googleId
    }).lean();

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User with given Google ID not found",
      });
    } else {
      res.status(200).json({
        success: true,
        result: { ...user },
        message: "Successfully retrieved user",
      });
    }
  })
);

module.exports = router;
