import React from "react";
import { useQuery, queryCache, useMutation } from "react-query";
import * as tweetsClient from "./tweets-client";
import { loadingTweet } from "./tweet-placeholder";
import { Spinner } from "../components/lib";

// const loadingTweets = Array.from({ length: 3 }, (v, index) => ({
//   id: `loading-tweet-${index}`,
//   ...loadingTweet,
// }));

const tweetQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function searchTweets(queryKey, { query }) {
  return tweetsClient.search({ query }).then((data) => data.tweets);
}

const getTweetSearchConfig = (query) => ({
  queryKey: ["tweetSearch", { query }],
  queryFn: searchTweets,
  config: {
    onSuccess(tweets) {
      for (const tweet of tweets) {
        queryCache.setQueryData(
          ["tweet", { tweetId: tweet._id }],
          tweet,
          tweetQueryConfig
        );
      }
    },
  },
});

function useTweetSearch(query) {
  const result = useQuery(getTweetSearchConfig(query));
  return { ...result, tweets: result.data ?? <Spinner /> };
}

function getTweet(queryKey, { tweetId }) {
  return tweetsClient.read(tweetId).then((data) => data.tweet);
}

function useTweet(tweetId) {
  const { data } = useQuery({
    queryKey: ["tweet", { tweetId }],
    queryFn: getTweet,
    ...tweetQueryConfig,
  });
  return data ?? <Spinner />;
}

function getTweetThread(queryKey, { tweetId }) {
  return tweetsClient.readChildren(tweetId).then((data) => data.tweets);
}

const getTweetThreadConfig = (tweetId) => ({
  queryKey: ["thread", { tweetId }],
  queryFn: getTweetThread,
  config: {
    onSuccess(tweets) {
      for (const tweet of tweets) {
        queryCache.setQueryData(
          ["tweet", { tweetId: tweet._id }],
          tweet,
          tweetQueryConfig
        );
      }
      return tweets;
    },
  },
});

function useTweetThread(tweetId) {
  const result = useQuery(getTweetThreadConfig(tweetId));
  console.log(result);
  return { ...result, tweets: result.data };
}

function getTweetsByUser(queryKey, { userId }) {
  return tweetsClient.readByUser(userId).then((data) => data.tweets);
}

const getTweetsByUserConfig = (userId) => ({
  queryKey: ["thread", { userId }],
  queryFn: getTweetsByUser,
  config: {
    onSuccess(tweets) {
      for (const tweet of tweets) {
        queryCache.setQueryData(
          ["tweet", { tweetId: tweet._id }],
          tweet,
          tweetQueryConfig
        );
      }
      return tweets;
    },
  },
});

function useTweetsByUser(userId) {
  const result = useQuery(getTweetsByUserConfig(userId));
  return { ...result, tweets: result.data };
}

async function refetchTweetSearchQuery() {
  queryCache.removeQueries("tweetSearch");
  await queryCache.prefetchQuery(getTweetSearchConfig(""));
}

// async function refetchTweetThread(tweetId) {
//   queryCache.removeQueries(["thread", { tweetId }]);
//   await queryCache.prefetchQuery(getTweetThread({ tweetId }));
// }

function setQueryDataForTweet(tweet) {
  queryCache.setQueryData({
    queryKey: ["tweet", { tweetId: tweet.id }],
    queryFn: tweet,
    ...tweetQueryConfig,
  });
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => queryCache.refetchQueries("tweet"),
  suspense: true,
  useErrorBoundary: false,
  throwOnError: true,
};

function onUpdateMutation(newTweet) {
  const previousTweets = queryCache.getQueryData("tweet");

  queryCache.setQueryData("tweet", (old) => {
    return old.map((tweet) => {
      return tweet.id === newTweet.id ? { ...tweet, ...newTweet } : tweet;
    });
  });

  return () => queryCache.setQueryData("tweet", previousTweets);
}

function useCreateTweet(options) {
  return useMutation(({ tweetData }) => tweetsClient.create({ tweetData }), {
    ...defaultMutationOptions,
    ...options,
  });
}

export {
  useTweet,
  useTweetSearch,
  useTweetThread,
  useTweetsByUser,
  useCreateTweet,
  setQueryDataForTweet,
  refetchTweetSearchQuery,

  // refetchTweetThread,
};
