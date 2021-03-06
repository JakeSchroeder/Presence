const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

//must go before passport middleware endpoints such as me
router.get("/search", async (req, res) => {
  const searchParams = new URLSearchParams(req.query);
  const query = searchParams.get("query");
  console.log(query);

  try {
    let matchedUsers = [];
    if (!query) {
      matchedUsers = [];
    } else {
      const searchResults = await User.find({
        $text: { $search: query },
      });

      matchedUsers = searchResults;
    }

    res.json({ users: matchedUsers });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    console.log(errors);
    return res.status(400).json(errors);
  }

  //TODO Fix For No Last Name

  const userId = Math.floor(10000000 + Math.random() * 90000000);
  const userName =
    req.body.name.split(" ")[0] +
    req.body.name.split(" ")[1].substring(0, 3) +
    userId;

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        displayName: `${req.body.name}`,
        userName: `${userName}`,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// { user: { ...decodedUser, token } }

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        displayName: req.user.displayName,
        userName: req.user.userName,
        email: req.user.email,
      },
    });
  }
);

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      console.log(data);
      res.json({
        user: {
          id: data._id,
          avatarPath: data.avatarPath,
          userName: data.userName,
          displayName: data.displayName,
          date: data.date,
        },
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/login", (req, res) => {
  // Form validation
  console.log("reaching here");
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user._id,
          displayName: user.displayName,
          userName: user.userName,
          email: user.email,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              user: {
                ...payload,
                token: token,
              },
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
