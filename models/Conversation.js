const mongoose = require("mongoose");
// const MpathPlugin = require("mongoose-mpath");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: "user" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Conversation = mongoose.model(
  "Conversation",
  ConversationSchema
);
