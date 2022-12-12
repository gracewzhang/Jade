const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    google_id: { type: String, default: "" },
    email: { type: String, default: "" },
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    created_at: { type: Date, default: Date.now() },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", User);
