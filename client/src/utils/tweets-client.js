import { client } from "./api-client";
import { useAuth } from "../context/authContext";

function create(tweetData) {
  console.log(tweetData);
  return client(`tweets/new`, { body: tweetData });
}

function search({ query = "" }) {
  return client(
    `tweets/search?query=${encodeURIComponent(
      query
    )}&id=${window.localStorage.getItem("userId")}`
  );
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
