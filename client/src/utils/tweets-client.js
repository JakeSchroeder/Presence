import { client } from "./api-client";

function create(tweetData) {
  console.log(tweetData);
  return client(`tweets/new`, { body: tweetData });
}

function search({ query = "" }) {
  return client(`tweets/search?query=${encodeURIComponent(query)}`);
}

function read(tweetId) {
  return client(`tweets/getTweetById${tweetId}`);
}

function readByUser(userId) {
  return client(`tweets/getTweetsByUser/${userId}`);
}

function readChildren(tweetId) {
  return client(`tweets/getTweetChildrenById/${tweetId}`);
}

export { create, read, search, readChildren, readByUser };
