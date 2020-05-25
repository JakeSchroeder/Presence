const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = require("./Comment");

const TweetSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  comments: [Comment.schema],
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  replies: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

TweetSchema.index({ "$**": "text" });

module.exports = Tweet = mongoose.model("tweet", TweetSchema);
