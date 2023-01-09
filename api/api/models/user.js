const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    google_id: { type: String, default: "" },
    email: { type: String, default: "" },
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    created_at: { type: Date, default: new Date() },
    primary_color: {type: String, default: '#FFB2A7'},
    secondary_color: {type: String, default: '#FAE0AF'}
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", User);
