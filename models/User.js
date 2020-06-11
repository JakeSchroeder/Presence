const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  avatarPath: { type: String, default: "../../../img/profile.png" },
  displayName: {
    type: String,
    required: true,
    index: true,
  },
  userName: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

// UserSchema.index({ displayName: "text" });

module.exports = User = mongoose.model("user", UserSchema);
