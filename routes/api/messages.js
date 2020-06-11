const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");
const Conversation = require("../../models/Conversation");
const User = require("../../models/User");

router.post("/new", async (req, res) => {
  try {
    const newConversation = new Conversation({
      members: req.body.members,
    });

    const newConvoRes = await newConversation.save();

    const newMessage = new Message({
      conversationId: newConversation._id,
      author: req.body.userId,
      content: req.body.content,
    });

    const newMessageRes = await newMessage.save();

    res.json(newMessageRes);
  } catch (err) {
    console.log(err);
  }
});

router.post("/reply", async (req, res) => {
  try {
    const newMessage = new Message({
      conversationId: req.body.conversationId,
      author: req.body.userId,
      content: req.body.content,
    });

    const newMessageRes = newMessage.save();

    res.json(newMessageRes);
  } catch (err) {
    res.json(err);
  }
});

router.get("/getConversationsByUser/:id", async (req, res) => {
  const loggedInUser = req.params.id;

  try {
    const conversations = await Conversation.find({ members: loggedInUser })
      .populate({ path: "members", select: "-password" })
      .sort("-createdAt");

    res.json({ conversations });
  } catch (err) {
    res.json(err);
  }
});

router.get("/getMessagesByConversation/:id", async (req, res) => {
  const conversationId = req.params.id;

  try {
    const messages = await Message.find({ conversationId: conversationId })
      // .populate({ path: "author", select: "-password" })
      .populate("author", "-password")
      .sort("createdAt");
    res.json({ messages: messages });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
