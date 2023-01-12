const express = require("express");
const router = express.Router();
const { errorWrap } = require("../middleware");
const User = require("../models/user");
const Day = require("../models/day");

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
      res.status(200).json({
        message: "Successfully created new user",
        success: true,
        result: newUser,
      });
    }
  })
);

router.put(
  "/:googleId",
  errorWrap(async (req, res) => {
    const updatedUser = await User.updateOne({ google_id: req.params.googleId }, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "User with given google ID not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully updated user",
        result: updatedUser,
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
    const user = await User.findOne({
      google_id: req.params.googleId
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User with given Google ID not found",
      });
    } else {
      res.status(200).json({
        success: true,
        result: user,
        message: "Successfully retrieved user",
      });
    }
  })
);

router.get(
  "/exists/:googleId",
  errorWrap(async (req, res) => {
    const userExists = await User.exists({
      google_id: req.params.googleId
    });

    res.status(200).json({
      success: true,
      result: userExists === null ? false : userExists,
      message: "Successfully checked if user exists",
    });
  })
);

router.get(
  "/:googleId/day",
  errorWrap(async (req, res) => {
    const days = await Day.find({
      google_id: req.params.googleId
    }).lean();


    res.status(200).json({
      success: true,
      result: days,
      message: "Successfully retrieved days",
    });
  })
);

router.get(
  "/:googleId/day/count",
  errorWrap(async (req, res) => {
    try {
      const numDays = await Day.countDocuments({
        google_id: req.params.googleId
      });

      res.status(200).json({
        success: true,
        result: numDays,
        message: "Successfully counted number of days",
      });
    } catch {
      res.status(404).json({
        success: false,
        message: "User with given google ID not found"
      })
    }
  })
);

router.get(
  "/:googleId/day/random",
  errorWrap(async (req, res) => {
    const days = await Day.aggregate([
      { $match: { google_id: req.params.googleId } }, { $sample: { size: 1 } }
    ]);

    res.status(200).json({
      success: true,
      result: days,
      message: "Successfully retrieved favorite days",
    });
  })
);

router.get(
  "/:googleId/day/favorites",
  errorWrap(async (req, res) => {
    Day.find({
      google_id: req.params.googleId,
      is_favorite: true
    }).sort({
      date: 1
    }).lean().exec((err, docs) => {
      res.status(200).json({
        success: true,
        result: docs,
        message: "Successfully retrieved favorite days",
      });
    });
  })
);

router.get(
  "/:googleId/day/date/:day",
  errorWrap(async (req, res) => {
    Day.find({
      google_id: req.params.googleId,
      date: { $regex: `${req.params.day}$` }
    }).sort(
      { date: 1 }
    ).lean().exec((err, docs) => {
      res.status(200).json({
        success: true,
        result: docs,
        message: "Successfully retrieved days with given day",
      });
    });
  })
);

router.get(
  "/:googleId/day/date/:date",
  errorWrap(async (req, res) => {
    const day = await Day.findOne({
      google_id: req.params.googleId,
      date: req.params.date
    }).lean();

    if (!day) {
      res.status(404).json({
        success: false,
        message: "Day with given user and date not found",
      });
    } else {
      res.status(200).json({
        success: true,
        result: { ...day },
        message: "Successfully retrieved day",
      });
    }
  })
);

router.get(
  "/:googleId/day/exists/date/:date",
  errorWrap(async (req, res) => {
    const dayExists = await Day.exists({
      google_id: req.params.googleId,
      date: req.params.date
    }).lean();

    res.status(200).json({
      success: true,
      result: dayExists === null ? false : dayExists,
      message: "Successfully checked if user exists",
    })
  })
);

module.exports = router;
