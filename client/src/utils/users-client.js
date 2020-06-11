import { client } from "./api-client";

// function search({query = ''}) {
//   return client(`books?query=${encodeURIComponent(query)}`)
// }

const loggedInUserId = window.localStorage.getItem("userId");

function read(userId) {
  return client(`user/${userId}`);
}

function search({ query = "" }) {
  return client(
    `user/search?query=${encodeURIComponent(query)}&userId=${loggedInUserId}`
  );
}

export { read, search };
