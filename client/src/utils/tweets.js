import { useQuery, queryCache } from "react-query";
import * as tweetsClient from "./tweets-client";
import { loadingTweet } from "./tweet-placeholder";

const loadingTweets = Array.from({ length: 5 }, (v, index) => ({
  id: `loading-tweet-${index}`,
  ...loadingTweet,
}));

function searchTweets(queryKey, { query }) {
  return tweetsClient.search({ query }).then((data) => data.tweets);
}

const tweetQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

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
  return { ...result, tweets: result.data ?? loadingTweets };
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
  return data ?? loadingTweet;
}

async function refetchTweetSearchQuery() {
  queryCache.removeQueries("tweetSearch");
  await queryCache.prefetchQuery(getTweetSearchConfig(""));
}

function setQueryDataForTweet(tweet) {
  queryCache.setQueryData({
    queryKey: ["tweet", { tweetId: tweet.id }],
    queryFn: tweet,
    ...tweetQueryConfig,
  });
}

export {
  useTweet,
  useTweetSearch,
  setQueryDataForTweet,
  refetchTweetSearchQuery,
};
