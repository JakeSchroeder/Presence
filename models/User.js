const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  avatarPath: { type: String, default: "../../../img/profile.png" },
  displayName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // cart: {
  //   type: Array,
  //   required: true
  // },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.index({ "$**": "text" });

module.exports = User = mongoose.model("user", UserSchema);
