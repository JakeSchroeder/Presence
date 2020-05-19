const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTweetInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.content = !isEmpty(data.content) ? data.content : "";

  // Email checks
  if (Validator.isEmpty(data.content)) {
    errors.tweetContent = "Tweet field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
