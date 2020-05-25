import { useQuery, queryCache } from "react-query";
import * as usersClient from "./users-client";
// import {loadingBook} from './book-placeholder'

const userQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function getUser(queryKey, { userId }) {
  return usersClient.read(userId).then((data) => data.user);
}

function useUser(userId) {
  const { data } = useQuery({
    queryKey: ["user", { userId }],
    queryFn: getUser,
    ...userQueryConfig,
  });
  return (
    data ?? {
      userName: "Loading...",
      displayName: "Loading...",
      loadingUser: true,
    }
  );
}

function setQueryDataForUser(user) {
  queryCache.setQueryData({
    queryKey: ["user", { userId: user.id }],
    queryFn: user,
    ...userQueryConfig,
  });
}

export { useUser, setQueryDataForUser };
