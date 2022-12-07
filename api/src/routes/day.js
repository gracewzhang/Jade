const express = require("express");
const router = express.Router();
const { errorWrap } = require("../middleware");
const Day = require("../models/day");

router.post(
  "/",
  errorWrap(async (req, res) => {
    let newDay = await Day.create(req.body);
    if (newDay) {
      newDay = await Day.findById(newDay._id); // add .populate()
      res.status(200).json({
        message: "Successfully created new day",
        success: true,
        result: newDay,
      });
    }
  })
);

router.get(
  "/",
  errorWrap(async (req, res) => {
    const days = await Day.find({});
    res.status(200).json({
      message: `Successfully retrieved all days.`,
      success: true,
      result: days,
    });
    return;
  })
);

router.get(
  "/:dayId",
  errorWrap(async (req, res) => {
    const day = await Day.findById(req.params.dayId).lean();

    if (!day) {
      res.status(404).json({
        success: false,
        message: "Day with given ID not found",
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

router.put(
  "/:dayId",
  errorWrap(async (req, res) => {
    let updatedDay = await Day.findByIdAndUpdate(req.params.dayId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDay) {
      res.status(404).json({
        success: false,
        message: "Day with given ID not found",
      });
      return;
    }

    updatedDay = await Day.findById(req.params.dayId);

    res.status(200).json({
      success: true,
      message: "Successfully updated day",
      result: updatedDay,
    });
  })
);

router.delete(
  "/:dayId",
  errorWrap(async (req, res) => {
    const deletedDay = await Day.findByIdAndDelete(req.params.dayId);

    if (!deletedDay) {
      res.status(404).json({
        success: false,
        message: "Day with given ID not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Day successfully deleted",
      result: deletedDay,
    });
  })
);

router.get(
  "/date/:date",
  errorWrap(async (req, res) => {
    const day = await Day.findOne({ date: req.params.date }).lean();
    if (!day) {
      res.status(404).json({
        success: false,
        message: "Day with given date not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      result: { ...day },
      message: "Successfully retrieved day",
    });
    return;
  })
);

module.exports = router;
