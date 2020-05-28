const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// const { v4: uuidv4 } = require("uuid");
// Load input validation
const validateTweetInput = require("../../validation/tweet");

// Load User model
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");

router.post("/new", async (req, res) => {
  try {
    const newTweet = new Tweet({
      parent: req.body.parent ? `${req.body.parent}` : null,
      content: `${req.body.tweetData.content}`,
      author: `${req.body.tweetData.author}`,
    });
    const saveResponse = await newTweet.save();
    res.json(saveResponse);
  } catch (err) {
    res.json(err);
  }
});

router.get("/search", async (req, res) => {
  //const query = req.query.get("query");
  // res.jsom(query);
  try {
    const searchParams = new URLSearchParams(req.query);
    const query = searchParams.get("query");
    let matchedTweets = [];
    if (!query) {
      console.log("none");
      const allParentTweets = await Tweet.find({ parent: null }).populate(
        "author",
        "-password"
      );
      matchedTweets = allParentTweets;
    } else {
      const searchResults = await Tweet.find({
        $text: { $search: query },
      }).populate("author", "-password");
      matchedTweets = searchResults;
    }
    res.json({ tweets: matchedTweets });
  } catch (err) {
    res.json(err);
  }
  // try {
  // const searchResults = await Tweet.find({
  //   $text: { $search: req.query.query },
  // }).populate("author", "-password");
  //   console.log(searchResults);
  //   res.json({ tweets: searchResults });
  // } catch (err) {
  //   res.json(err);
  // }
  // try {
  //   if (!req.query.query) {
  //     return;
  //   }

  //   Tweet.find()

  // } catch (err) {
  //   res.json(err);
  // }
});

// router.get("/", (req, res) => {
//   if (req.query.query === "") {
//     Tweet.find()
//       .sort("-date")
//       .populate("author")
//       .then((data) => {
//         res.json({ tweets: data });
//       })
//       .catch((err) => console.log(err));
//   } else {
//     const searchTerm = req.query.query;

//     Tweet.find()
//       .limit(10)
//       .populate("author")
//       .find({ $text: { $search: `${searchTerm}` } })
//       .then((data) => {
//         res.json({ tweets: data });
//       })
//       .catch((err) => console.log(err));
//   }
// });

router.get("/getTweetById/:id", async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ _id: req.params.id }).populate(
      "author",
      "-password"
    );
    res.json(tweet);
  } catch (err) {
    res.json(err);
  }
});

router.get("/getTweetChildrenById/:id", async (req, res) => {
  try {
    const tweetParent = await Tweet.findById(req.params.id).populate(
      "author",
      "-password"
    );
    const tweetChildren = await tweetParent
      .getImmediateChildren({})
      .populate("author", "-password");
    res.json({ tweets: [tweetParent, ...tweetChildren] });
  } catch (err) {
    res.json(err);
  }
});

router.get("/getTweetsByUser/:id", async (req, res) => {
  try {
    const tweets = await Tweet.find({ author: req.params.id }).populate(
      "author",
      "-password"
    );
    res.json({ tweets: tweets });
  } catch (err) {
    res.json(err);
  }
});

// router.get(
//   "/list-items",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const user = req.user;
//     Tweet.find({ author: user._id })
//       .sort("-date")
//       .populate("author")
//       .then((tweets) => {
//         const listItemsData = tweets.map((tweet) => ({
//           tweet: tweet,
//           tweetId: tweet._id,
//           ownerId: user._id,

//           canDelete: true,
//         }));
//         console.log(listItemsData);
//         res.json({ listItems: listItemsData });
//       })
//       .catch((err) => console.log(err));
//   }
// );

// router.get("/:userId/all", (req, res) => {
//   Tweet.find({ author: req.params.userId })
//     .sort("-date")
//     .populate("author")
//     .then((thing) => res.json(thing))
//     .catch((err) => console.log(err));
// });

// router.post("/:id/like", (req, res) => {
//   Tweet.findById(req.params.id).then((tweet) => {
//     // res.json(tweet);
//     tweet.likes += 1;
//     tweet
//       .save()
//       .then((thing) => {
//         res.json(thing);
//       })
//       .catch((err) => {
//         res.json(err);
//       });
//   });
// });

// content: { type: String, required: true },
//   comments: [this],
//   author: { type: Schema.Types.ObjectId, ref: "user", required: true },
//   postId: { type: Schema.Types.ObjectId, ref: "tweet", required: true },

// router.post("/:id/comment/new", (req, res) => {
//   const tweetId = req.params.id;
//   Tweet.findById(tweetId).then((tweet) => {
//     console.log(tweet);

//     const newComment = new Comment({
//       content: `${req.body.content}`,
//       author: `${req.body.userId}`,
//       tweetId: `${tweetId}`,
//     });

//     tweet.comments.unshift(newComment);
//     tweet.replies = tweet.comments.length;
//     tweet
//       .save()
//       .then((thing) => res.json(thing))
//       .catch((err) => console.log(err));
//   });
// });

// router.post("/:id/comment/:commentId/reply", (req, res) => {
//   const tweetId = req.params.id;
//   const commentId = req.params.commentId;
//   const userId = req.body.userId;
//   Tweet.findById(tweetId)
//     .then((tweet) => {
//       // console.log(tweet);
//       const findComment = (id, comments) => {
//         if (comments.length > 0) {
//           for (var index = 0; index < comments.length; index++) {
//             const comment = comments[index];
//             if (comment._id == id) {
//               console.log(comment);
//               return comment;
//             }
//             const foundComment = findComment(id, comment.comments);
//             if (foundComment) {
//               return foundComment;
//             }
//           }
//         }
//       };

//       const comment = findComment(commentId, tweet.comments);

//       const commentNew = new Comment({
//         content: `${req.body.content}`,
//         author: `${req.body.userId}`,
//         tweetId: `${tweetId}`,
//       });

//       comment.comments.unshift(commentNew);
//       comment.replies = comment.comments.length;
//       return tweet.save();
//     })
//     .then((tweet) => {
//       res.json(tweet);
//       console.log(tweet);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

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
