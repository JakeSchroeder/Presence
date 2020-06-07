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
  // console.log(req.body);
  console.log(req.body);
  try {
    const newTweet = new Tweet({
      parent: req.body.parent ? `${req.body.parent}` : null,
      content: `${req.body.content}`,
      author: `${req.body.author}`,
    });

    // console.log(newTweet);

    const saveResponse = await newTweet.save();

    if (newTweet.parent != null) {
      const tweet = await Tweet.findOne({ _id: newTweet.parent });
      tweet.replies++;
      await tweet.save();
    }

    res.json(saveResponse);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // console.log(req);
  const tweetId = req.params.id;
  try {
    const tweetForDelete = await Tweet.findOne({ _id: tweetId });

    if (tweetForDelete.parent != null) {
      const parentTweet = await Tweet.findOne({ _id: tweetForDelete.parent });
      if (parentTweet.replies > 0) {
        parentTweet.replies -= 1;
      }
      await parentTweet.save();
    }

    const result = await tweetForDelete.remove();

    console.log(result);
    res.json(result);
    // tweetForDelete.remove().then(tweet =>)
  } catch (err) {
    console.log(err);
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
      const allParentTweets = await Tweet.find({ parent: null })
        .populate("author", "-password")
        .sort("-createdAt");

      matchedTweets = allParentTweets;
    } else {
      // const searchResults = await Tweet.aggregate(
      //   { $match: { $text: { $search: query } } },
      //   (err,
      //   (tweetData) => {
      //     if (err) {
      //       return err;
      //     }

      //     if (tweetData.length) {
      //       let authorIds = tweetData.map((tweet) =>
      //         mongoose.Types.ObjectId(tweet.author)
      //       );
      //       console.log(authorId);
      //       User.aggregate(
      //         {
      //           $match: { $text: { $search: query, _id: { $in: authorIds } } },
      //         },
      //         (err, authorData) => {
      //           console.log(authorData);
      //         }
      //       );
      //     }
      //   })
      // );

      //       db.collection("users").aggregate({$match:{$text: {$search: "pink"}}},
      //       (err, userData: any)=>{
      //          if(err){
      //              return err;
      //          }

      //  if(userdata.length){

      //          let vehicleIds = userData.map((user) => mongoose.Types.ObjectId(user.vehicleId));

      //          db.collection("vehicles").aggregate({$match:{$text:{$search:"pink", _id: {$in: vehicleIds}}}}, (err, vehicleData)=>{

      //                   //this will be your vehicle details
      //          })
      //      })

      // }else{
      //     console.log("no Data found");
      // }

      // const searchResults = await allResults.find({
      //   // $text: { $search: query },
      // });

      // const filteredResults = searchResults.map((result) => {
      //   console.log(result.author.userName);
      //   if (result.author.userName.contains(query)) {
      //     return result;
      //   }
      // });

      // const searchResults = await Tweet.aggregate([{
      //   $match: {

      //   }
      // }])

      //.findById("x", {following: 1}).populate({ path: 'following',match: {$text: {$search: "john"}}})

      // .populate("author", "-password");

      // const searchResults = Tweet.aggregate([
      //   {
      //     $match: {
      //       $text: { $search: query },
      //     },
      //     $lookup: {
      //       from: "users",
      //       localField: "author",
      //       foreignField: "userName",
      //       as: "names",
      //     },
      //   },
      // ]);
      const searchResults = await Tweet.find({
        $text: { $search: query },
      })
        .populate("author", "-password")
        .sort("-createdAt");

      // console.log("searchShit" + filteredResults);
      // .sort("-createdAt");
      matchedTweets = searchResults;
    }

    // const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    const loggedInUser = searchParams.get("id");

    const result = matchedTweets.map((tweet) => {
      if (tweet.author._id == loggedInUser) {
        tweet.canDelete = true;
      }
      return tweet;
    });

    // console.log(result);

    res.json({ tweets: result });
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

    const loggedInUser = searchParams.get("id");

    if (tweet.author._id == loggedInUser) {
      tweet.canDelete = true;
    }

    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.get("/getTweetChildrenById/:id", async (req, res) => {
  const loggedInUser = req.query.userId;
  const tweetId = req.params.id;
  console.log("tweet id" + tweetId);
  try {
    const tweetParent = await Tweet.findById(tweetId).populate(
      "author",
      "-password"
    );
    const tweetChildren = await tweetParent
      .getImmediateChildren({})
      .populate("author", "-password")
      .sort("createdAt");

    const tweets = [tweetParent, ...tweetChildren];

    const result = tweets.map((tweet) => {
      if (tweet.author._id == loggedInUser) {
        tweet.canDelete = true;
      }
      return tweet;
    });

    console.log(result);

    res.json({ tweets: result });
  } catch (err) {
    res.json(err);
  }
});

router.get("/getTweetsByUser/:id", async (req, res) => {
  const loggedInUser = req.query.userId;
  const authorId = req.params.id;
  try {
    const tweets = await Tweet.find({ author: authorId })
      .populate("author", "-password")
      .sort("-createdAt");

    const result = tweets.map((tweet) => {
      if (tweet.author._id == loggedInUser) {
        tweet.canDelete = true;
      }
      return tweet;
    });

    // console.log(result);

    res.json({ tweets: result });
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
