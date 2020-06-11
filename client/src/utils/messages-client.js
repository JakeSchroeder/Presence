import { client } from "./api-client";
import { useAuth } from "../context/authContext";

const userId = window.localStorage.getItem("userId");

function create(messageData) {
  return client(`messages/new`, { body: messageData });
}

function createNewReply(replyData) {
  return client(`messages/reply`, { body: replyData });
}

function readConversationsByUser() {
  return client(`messages/getConversationsByUser/${userId}`);
}

function readMessagesByConversation(conversationId) {
  return client(`messages/getMessagesByConversation/${conversationId}`);
}

// function read(tweetId) {
//   return client(`tweets/getTweetById/${tweetId}?id=${userId}`);
// }

// function remove(tweetId) {
//   return client(`tweets/${tweetId}`, { method: "DELETE" });
// }

// function search({ query = "" }) {
//   return client(
//     `tweets/search?query=${encodeURIComponent(query)}&id=${userId}`
//   );
// }

// function like(tweetId) {
//   return client(`tweets/like/${tweetId}?userId=${userId}`, { method: "PATCH" });
// }

// function unlike(tweetId) {
//   return client(`tweets/unlike/${tweetId}?userId=${userId}`, {
//     method: "PATCH",
//   });
// }

// function readByUser(authorId) {
//   return client(`tweets/getTweetsByUser/${authorId}?userId=${userId}`);
// }

// function readChildren(tweetId) {
//   return client(`tweets/getTweetChildrenById/${tweetId}?userId=${userId}`);
// }

export {
  create,
  readConversationsByUser,
  readMessagesByConversation,
  createNewReply,
};
