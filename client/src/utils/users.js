import React from "react";
import { useQuery, queryCache } from "react-query";
import { Spinner } from "../components/lib";
import * as usersClient from "./users-client";
// import {loadingBook} from './book-placeholder'

const userQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

async function getUser(queryKey, { userId }) {
  return usersClient.read(userId).then((data) => data.user);
}

function useUser(userId) {
  const result = useQuery({
    queryKey: ["user", { userId }],
    queryFn: getUser,
    ...userQueryConfig,
  });
  return {
    ...result,
    user: result.data ?? {
      displayName: "Loading...",
      userName: "loading...",
      id: "loading",
    },
  };
}

function searchUsers(queryKey, { query }) {
  return usersClient.search({ query }).then((data) => data.users);
}

const getUserSearchConfig = (query) => ({
  queryKey: ["userSearch", { query }],
  queryFn: searchUsers,
  config: {
    onSuccess(users) {
      for (const user of users) {
        queryCache.setQueryData(
          ["user", { userId: user._id }],
          user,
          userQueryConfig
        );
      }
      // queryCache.setQueryData("tweets", tweets);
    },
  },
});

function useUserSearch(query) {
  const result = useQuery(getUserSearchConfig(query));
  return { ...result, users: result.data ?? <Spinner /> };
}

function setQueryDataForUser(user) {
  queryCache.setQueryData({
    queryKey: ["user", { userId: user.id }],
    queryFn: user,
    ...userQueryConfig,
  });
}

export { useUser, useUserSearch, setQueryDataForUser };
