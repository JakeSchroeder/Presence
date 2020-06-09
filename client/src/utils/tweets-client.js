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

function like(tweetId) {
  return client(`tweets/like/${tweetId}?userId=${userId}`, { method: "PATCH" });
}

function unlike(tweetId) {
  return client(`tweets/unlike/${tweetId}?userId=${userId}`, {
    method: "PATCH",
  });
}

function read(tweetId) {
  return client(`tweets/getTweetById/${tweetId}?id=${userId}`);
}

function readByUser(authorId) {
  return client(`tweets/getTweetsByUser/${authorId}?userId=${userId}`);
}

function readChildren(tweetId) {
  return client(`tweets/getTweetChildrenById/${tweetId}?userId=${userId}`);
}

function remove(tweetId) {
  return client(`tweets/${tweetId}`, { method: "DELETE" });
}

export { create, read, remove, search, like, unlike, readChildren, readByUser };
