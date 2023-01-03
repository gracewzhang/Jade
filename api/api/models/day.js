const mongoose = require("mongoose");

const Day = new mongoose.Schema(
  {
    google_id: { type: String, default: ""}, 
    date: { type: String, default: "" },
    title: { type: String, default: "" },
    entry: { type: String, default: "" },
    song: { type: String, default: "" },
    food: { type: String, default: "" },
    thoughts: { type: [String], default: ["", "", ""] },
    photos: { type: [String], default: ["", "", "", ""] },
    is_favorite: { type: Boolean, default: false },
  },
  { collection: "days" }
);

module.exports = mongoose.model("Day", Day);
