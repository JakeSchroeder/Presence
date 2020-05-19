const express = require("express");
const router = express.Router();

// Load input validation
// const validateTweetInput = require("../../validation/tweet");

// Load User model
// const Tweet = require("../../models/Tweet");
// const Comment = require("../../models/Comment");

// router.post('/tweet/:tweetId/comments', (req, res) => {
   
//     const postId = req.params.postId;
//     Tweet.findById(postId).then((post) => {
//       const author = req.user;
//       const authorId = author._id;
//       const content = req.body.postContent;
//       const authorName = author.username;

//       const comment = new Comment({
//         content,
//         postId,
//         author: authorId,
//         authorName
//       });

//       post.comments.unshift(comment);
//       post.save();
//       return res.redirect('/post/'+postId);
//     }).catch((err) => {

//     });
//   });

// module.exports = router;