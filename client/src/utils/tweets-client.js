import { client } from "./api-client";
import { useAuth } from "../context/authContext";

const userId = window.localStorage.getItem("userId");

function create(tweetData) {
  console.log(tweetData);
  return client(`tweets/new`, { body: tweetData });
}

function search({ query = "" }) {
  return client(
    `tweets/search?query=${encodeURIComponent(query)}&id=${userId}`
  );
}

function read(tweetId) {
  return client(`tweets/getTweetById/${tweetId}?id=${userId}`);
}

function readByUser(userId) {
  return client(`tweets/getTweetsByUser/${userId}?userId=${userId}`);
}

function readChildren(tweetId) {
  return client(`tweets/getTweetChildrenById/${tweetId}?userId=${userId}`);
}

export { create, read, search, readChildren, readByUser };
