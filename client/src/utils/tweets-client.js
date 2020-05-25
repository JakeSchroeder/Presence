import { client } from "./api-client";

function search({ query = "" }) {
  return client(`tweet?query=${encodeURIComponent(query)}`);
}

function read(tweetId) {
  return client(`tweet/${tweetId}`);
}

export { read, search };
