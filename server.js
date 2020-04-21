const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const passport = require("passport");
const path = require("path");
require("dotenv").config();
const Twitter = require("twitter-lite");
// const users = require("./routes/api/users");
// const products = require("./routes/api/products");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
// app.use(passport.initialize());

// Passport config
// require("./config/passport")(passport);

// Routes
// app.use("/api/users", users);
// app.use("/api/products", products);

app.get("/", (req, res) => {
    res.json("Hello World");
});

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

const client = new Twitter({
  consumer_key: "ScT3r9YdgAvptzikQMP4oXGrx",
  consumer_secret: "WFMccKdyuZQ9vUNXR81yK7yxSO5InsNDW4HFsigXEYJrSr8pg1",
  access_token_key: "1235303880705167363-pbgxnK6VVaYeJSfOnID4T3HiXCusWi",
  access_token_secret: "l4eRJOXYqquOnnQ0h4XiwE8PeBplVJSwzBvVXDPPVmkZD"
});


// client.get("users/search", {
//   name: "search",
//   q: "test",
//   count: 5
// }).then(res => console.log(res));
