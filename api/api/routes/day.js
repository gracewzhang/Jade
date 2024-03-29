const express = require("express");
const router = express.Router();
const { errorWrap } = require("../middleware");
const Day = require("../models/day");
const moment = require("moment");

router.post(
  "/",
  errorWrap(async (req, res) => {
    const newDay = await Day.create(req.body);
    if (newDay) {
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
      message: "Successfully retrieved all days.",
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
    const updatedDay = await Day.findByIdAndUpdate(req.params.dayId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDay) {
      res.status(404).json({
        success: false,
        message: "Day with given ID not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully updated day",
        result: updatedDay,
      });
    }
  })
);

router.put(
  "/:dayId/photos/:photoIdx",
  errorWrap(async (req, res) => {
    const oldPhotos = (await Day.findById(req.params.dayId)).photos;
    const newPhotos = oldPhotos.map((photo, key) => {
      if (String(key) === req.params.photoIdx) return req.body.url;
      return photo;
    });

    const updatedDay = await Day.findByIdAndUpdate(req.params.dayId, { photos: newPhotos }, {
      new: true,
      runValidators: true,
    });

    if (!updatedDay) {
      res.status(404).json({
        success: false,
        message: "Day with given ID not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully updated day",
        result: updatedDay,
      });
    }
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
