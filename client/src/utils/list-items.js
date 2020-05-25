import { useQuery, useMutation, queryCache } from "react-query";
import { setQueryDataForTweet } from "./tweets";
import * as listItemsClient from "./list-items-client";

function useListItem(tweetId, options) {
  const listItems = useListItems(options);
  return listItems?.find((li) => li.tweetId === tweetId) ?? null;
}

function readListItems() {
  return listItemsClient.read().then((d) => d.listItems);
}

function useListItems({ onSuccess, ...options } = {}) {
  const { data: listItems } = useQuery({
    queryKey: "list-items",
    queryFn: readListItems,
    onSuccess: async (listItems) => {
      await onSuccess?.(listItems);
      for (const listItem of listItems) {
        console.log(listItem);
        setQueryDataForTweet(listItem.tweet);
      }
    },
    ...options,
  });
  return listItems ?? [];
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => queryCache.refetchQueries("list-items"),
  useErrorBoundary: false,
  throwOnError: true,
};

function onUpdateMutation(newItem) {
  const previousItems = queryCache.getQueryData("list-items");

  queryCache.setQueryData("list-items", (old) => {
    return old.map((item) => {
      return item.id === newItem.id ? { ...item, ...newItem } : item;
    });
  });

  return () => queryCache.setQueryData("list-items", previousItems);
}

function useUpdateListItem(options) {
  return useMutation((updates) => listItemsClient.update(updates.id, updates), {
    onMutate: onUpdateMutation,
    ...defaultMutationOptions,
    ...options,
  });
}

function useRemoveListItem(options) {
  return useMutation(({ id }) => listItemsClient.remove(id), {
    onMutate: (removedItem) => {
      const previousItems = queryCache.getQueryData("list-items");

      queryCache.setQueryData("list-items", (old) => {
        return old.filter((item) => item.id !== removedItem.id);
      });

      return () => queryCache.setQueryData("list-items", previousItems);
    },
    ...defaultMutationOptions,
    ...options,
  });
}

function useCreateListItem(options) {
  return useMutation(({ tweetId }) => listItemsClient.create({ tweetId }), {
    ...defaultMutationOptions,
    ...options,
  });
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
};

/*
eslint
  no-unused-expressions: "off",
*/
