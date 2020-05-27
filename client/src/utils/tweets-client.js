import { client } from "./api-client";

function search({ query = "" }) {
  return client(`tweets/search?query=${encodeURIComponent(query)}`);
}

function read(tweetId) {
  return client(`tweets/getTweetById${tweetId}`);
}

function readChildren(tweetId) {
  return client(`tweets/getTweetChildrenById/${tweetId}`);
}

export { read, search, readChildren };
