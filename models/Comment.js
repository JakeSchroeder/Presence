const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  comments: [this],
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  tweetId: { type: Schema.Types.ObjectId, ref: "tweet", required: true },
  likes: { type: Number, default: 0 },
  replies: { type: Number, default: 0 },
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
