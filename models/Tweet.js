const mongoose = require("mongoose");
const MpathPlugin = require("mongoose-mpath");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  content: {
    type: String,
    default: "",
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  replies: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  canDelete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TweetSchema.index({ content: "text" });

TweetSchema.plugin(MpathPlugin, [
  {
    pathSeparator: "#",
    onDelete: "DELETE",
    idType: Schema.Types.ObjectId,
  },
]);

module.exports = Tweet = mongoose.model("Tweet", TweetSchema);
