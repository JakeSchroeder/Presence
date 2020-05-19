const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load input validation
const validateTweetInput = require("../../validation/tweet");

// Load User model
const Tweet = require("../../models/Tweet");

router.post("/new", (req, res) => {
  // Form validation

  const { errors, isValid } = validateTweetInput(req.body);

  //Check validation
  if (!isValid) {
    console.log(errors);
    return res.status(400).json(errors);
  }

  const newTweet = new Tweet({
    content: `${req.body.content}`,
    author: `${req.body.userId}`,
  });

  newTweet
    .save()
    .then((thing) => res.json(thing))
    .catch((err) => console.log(err));
});

router.get("/all", (req, res) => {
  Tweet.find()
    .sort("-date")
    .populate("author")
    .then((thing) => res.json(thing))
    .catch((err) => console.log(err));
});

router.get("/:userId/all", (req, res) => {
  Tweet.find({ author: req.params.userId })
    .sort("-date")
    .populate("author")
    .then((thing) => res.json(thing))
    .catch((err) => console.log(err));
});

router.post("/:id/like", (req, res) => {
  Tweet.findById(req.params.id).then((tweet) => {
    // res.json(tweet);
    tweet.likes += 1;
    tweet
      .save()
      .then((thing) => {
        res.json(thing);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Tweet.findById(req.params.id)
    .populate("author")
    .populate("comments.author")

    .then((tweet) => {
      // post.populate({
      //   path: "comments",
      //   populate: {
      //     path: "auhtor",
      //     model: "user",
      //   },
      // });
      res.json(tweet);
    })
    // {
    //   path: "author",
    //   model: User,
    //   populate: {
    //     path: "comments",
    //     populate: {
    //       path: "author",
    //       model: User,
    //     },
    //   },
    // }
    .catch((err) => {
      // TODO: Errors need developement
      // const status = 500;
      // const message = "oops";
      // res.status(status).json({ status, message });
      console.log(err);
    });
});

// content: { type: String, required: true },
//   comments: [this],
//   author: { type: Schema.Types.ObjectId, ref: "user", required: true },
//   postId: { type: Schema.Types.ObjectId, ref: "tweet", required: true },

router.post("/:id/comment/new", (req, res) => {
  const tweetId = req.params.id;
  Tweet.findById(tweetId).then((tweet) => {
    console.log(tweet);

    const newComment = new Comment({
      content: `${req.body.content}`,
      author: `${req.body.userId}`,
      tweetId: `${tweetId}`,
    });

    tweet.comments.unshift(newComment);
    tweet.replies = tweet.comments.length;
    tweet
      .save()
      .then((thing) => res.json(thing))
      .catch((err) => console.log(err));
  });
});

router.post("/:id/comment/:commentId/reply", (req, res) => {
  const tweetId = req.params.id;
  const commentId = req.params.commentId;
  const userId = req.body.userId;
  Tweet.findById(tweetId)
    .then((tweet) => {
      // console.log(tweet);
      const findComment = (id, comments) => {
        if (comments.length > 0) {
          for (var index = 0; index < comments.length; index++) {
            const comment = comments[index];
            if (comment._id == id) {
              console.log(comment);
              return comment;
            }
            const foundComment = findComment(id, comment.comments);
            if (foundComment) {
              return foundComment;
            }
          }
        }
      };

      const comment = findComment(commentId, tweet.comments);

      const commentNew = new Comment({
        content: `${req.body.content}`,
        author: `${req.body.userId}`,
        tweetId: `${tweetId}`,
      });

      comment.comments.unshift(commentNew);
      comment.replies = comment.comments.length;
      return tweet.save();
    })
    .then((tweet) => {
      res.json(tweet);
      console.log(tweet);
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.get("/:id/comment/all", (req, res) => {
//   console.log(req.params.id);
//   let listOfComment = [];
//   Tweet.findById(req.params.id)
//     .populate({
//       path: "author",
//       model: Comment,
//     })
//     .then((comments) => {
//       console.log(comments);
//     })
//     // .then((tweet) => {
//     //   res.json(tweet);
//     // })
//     // .then((tweet) => {
//     //   tweet.comments.map((comment) => {
//     //     listOfComment.push(comment.populate("author"));
//     //   });
//     //   res.json(listOfComment);
//     // })
//     .catch((err) => {
//       // TODO: Errors need developement
//       // const status = 500;
//       // const message = "oops";
//       // res.status(status).json({ status, message });
//       console.log(err);
//     });
// });

module.exports = router;
