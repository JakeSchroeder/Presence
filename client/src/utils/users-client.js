import { client } from "./api-client";

// function search({query = ''}) {
//   return client(`books?query=${encodeURIComponent(query)}`)
// }

function read(userId) {
  return client(`user/${userId}`);
}

export { read };
