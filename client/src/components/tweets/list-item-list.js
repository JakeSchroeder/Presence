import React from "react";
import styled from "styled-components";
import { useListItems } from "../../utils/list-items";

import { TweetRow } from "./tweet-row";

const TweetListUl = styled.ul`
  margin: 0;
  padding: 0;
`;

function ListItemList({ filterListItems, noListItems, noFilteredListItems }) {
  const listItems = useListItems();

  const filteredListItems = listItems.filter(filterListItems);

  if (!listItems.length) {
    return (
      <div css={{ marginTop: "1em", fontSize: "1.2em" }}>{noListItems}</div>
    );
  }
  if (!filteredListItems.length) {
    return (
      <div css={{ marginTop: "1em", fontSize: "1.2em" }}>
        {noFilteredListItems}
      </div>
    );
  }

  return (
    <TweetListUl>
      {filteredListItems.map((listItem) => (
        <li key={listItem._id}>
          <TweetRow tweet={listItem.tweet} />
        </li>
      ))}
    </TweetListUl>
  );
}

export { ListItemList };
