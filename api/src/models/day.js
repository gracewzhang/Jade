const mongoose = require("mongoose");

const Day = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId }, // add the ref: 'User' thing
  date: { type: String, default: "" },
  title: { type: String, default: "" },
  entry: { type: String, default: "" },
  thoughts: { type: [String], default: ["", "", ""] },
  photos: { type: [String], default: ["", "", "", ""] },
  is_favorite: { type: Boolean, default: false },
});

module.exports = mongoose.model("Day", Day);
