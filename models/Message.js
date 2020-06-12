const mongoose = require("mongoose");
const MpathPlugin = require("mongoose-mpath");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  conversationId: {
    type: Schema.Types.ObjectId,
    ref: "conversation",
  },
  content: {
    type: String,
    default: "",
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  containsTweet: { type: Schema.Types.ObjectId, ref: "Tweet", required: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

MessageSchema.index({ "$**": "text" });

// MessageSchema.plugin(MpathPlugin, [
//   {
//     pathSeparator: "#",
//     onDelete: "DELETE",
//     idType: Schema.Types.ObjectId,
//   },
// ]);

module.exports = Message = mongoose.model("Message", MessageSchema);
