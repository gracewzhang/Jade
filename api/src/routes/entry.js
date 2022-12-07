const express = require("express");
const router = express.Router();
const { errorWrap } = require("../middleware");
const Entry = require("../models/entry");

router.post(
  "/",
  errorWrap(async (req, res) => {
    let newEntry = await Entry.create(req.body);
    if (newEntry) {
      newEntry = await Entry.findById(newEntry._id); // add .populate()
      res.status(200).json({
        message: "Successfully created new entry",
        success: true,
        result: newEntry,
      });
    }
  })
);

router.get(
  "/",
  errorWrap(async (req, res) => {
    const entries = await Entry.find({});
    res.status(200).json({
      message: `Successfully retrieved all entries.`,
      success: true,
      result: entries,
    });
    return;
  })
);

router.get(
  "/:entryId",
  errorWrap(async (req, res) => {
    const entry = await Entry.findById(req.params.entryId).lean();

    if (!entry) {
      res.status(404).json({
        success: false,
        message: "Entry with given ID not found",
      });
    } else {
      res.status(200).json({
        success: true,
        result: { ...entry },
        message: "Successfully retrieved entry",
      });
    }
  })
);

router.put(
  "/:entryId",
  errorWrap(async (req, res) => {
    let updatedEntry = await Entry.findByIdAndUpdate(
      req.params.entryId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEntry) {
      res.status(404).json({
        success: false,
        message: "Entry with given ID not found",
      });
      return;
    }

    updatedEntry = await Entry.findById(req.params.entryId);

    res.status(200).json({
      success: true,
      message: "Successfully updated entry",
      result: updatedEntry,
    });
  })
);

router.delete(
  "/:entryId",
  errorWrap(async (req, res) => {
    const deletedEntry = await Entry.findByIdAndDelete(req.params.entryId);

    if (!deletedEntry) {
      res.status(404).json({
        success: false,
        message: "Entry with given ID not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Entry successfully deleted",
      result: deletedEntry,
    });
  })
);

router.get(
  "/date/:date",
  errorWrap(async (req, res) => {
    const entry = await Entry.findOne({ date: req.params.date }).lean();
    if (!entry) {
      res.status(404).json({
        success: false,
        message: "Entry with given date not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      result: { ...entry },
      message: "Successfully retrieved entry",
    });
    return;
  })
);

module.exports = router;
