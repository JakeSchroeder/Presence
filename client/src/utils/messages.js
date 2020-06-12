import React from "react";
import { useQuery, queryCache, useMutation } from "react-query";
import * as messagesClient from "./messages-client";
// import { loadingTweet } from "./tweet-placeholder";
// import { Spinner } from "../components/lib";

const messageQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function getMessagesByConversation(queryKey, { conversationId }) {
  return messagesClient
    .readMessagesByConversation(conversationId)
    .then((data) => data.messages);
}

const getMessagesByConversationConfig = (conversationId) => ({
  queryKey: ["messagesByConversation", { conversationId }],
  queryFn: getMessagesByConversation,
  config: {
    onSuccess(messages) {
      console.log(messages);
      for (const message of messages) {
        queryCache.setQueryData(
          ["message", { messageId: message._id }],
          message,
          messageQueryConfig
        );
      }
      return messages;
    },
  },
});

function useMessagesByConversation(conversationId) {
  const result = useQuery(getMessagesByConversationConfig(conversationId));
  return { ...result, messages: result.data ?? [] };
}

function getConversationsByUser(queryKey) {
  return messagesClient
    .readConversationsByUser()
    .then((data) => data.conversations);
}

const getConversationsByUserConfig = () => ({
  queryKey: ["conversationsByUser"],
  queryFn: getConversationsByUser,
  config: {
    onSuccess(convos) {
      // console.log(tweets);
      for (const convo of convos) {
        queryCache.setQueryData(
          ["convo", { convoId: convo._id }],
          convo,
          messageQueryConfig
        );
      }
      return convos;
    },
  },
});

// function useTweetThread(tweetId) {
//   const result = useQuery({
//     queryKey: ["thread", { tweetId }],
//     queryFn: getTweetThread,
//     onSuccess: async (tweets) => {
//       // await onSuccess?.(tweets);
//       for (const tweet of tweets) {
//         queryCache.setQueryData(
//           ["tweet", { tweetId: tweet._id }],
//           tweet,
//           tweetQueryConfig
//         );
//       }
//     },
//   });
//   return { ...result, tweets: result.data ?? [] };
// }

function useConversationsByUser() {
  const result = useQuery(getConversationsByUserConfig());
  return { ...result, conversations: result.data ?? [] };
}

function useCreateMessage(options) {
  return useMutation((messageData) => messagesClient.create(messageData), {
    onSettled: () => {
      // queryCache.refetchQueries("messagesByConversation");
      queryCache.refetchQueries("messagesByConversation");
      queryCache.refetchQueries("conversationsByUser");
      // queryCache.refetchQueries("tweetsByUser");
      // queryCache.refetchQueries("thread");
    },
    ...options,
  });
}

function useCreateNewReply(options) {
  return useMutation((replyData) => messagesClient.createNewReply(replyData), {
    onSettled: () => {
      queryCache.refetchQueries("messagesByConversation");
      queryCache.refetchQueries("conversationsByUser");

      // queryCache.refetchQueries("tweetsByUser");
      // queryCache.refetchQueries("thread");
    },
    ...options,
  });
}

function useLeaveConversation(options) {
  return useMutation(
    (conversationId) => messagesClient.leaveConversation(conversationId),
    {
      onSettled: () => {
        queryCache.refetchQueries("messagesByConversation");
        queryCache.refetchQueries("conversationsByUser");

        // queryCache.refetchQueries("tweetsByUser");
        // queryCache.refetchQueries("thread");
      },
      ...options,
    }
  );
}

export {
  useCreateMessage,
  useConversationsByUser,
  useMessagesByConversation,
  useCreateNewReply,
  useLeaveConversation,
};
