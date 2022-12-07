const mongoose = require("mongoose");

const Entry = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId }, // add the ref: 'User' thing
  date: { type: String, default: "" },
  title: { type: String, default: "" },
  review: { type: String, default: "" },
  thoughts: { type: [String], default: ["", "", ""] },
  photos: { type: [String], default: ["", "", "", ""] },
  isFavorite: { type: Boolean, default: false },
});

module.exports = mongoose.model("Entry", Entry);
