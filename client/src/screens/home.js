import React, { useState, useContext } from "react";
import styled from "styled-components";
import TrendsForYou from "../components/trends-for-you";
import WhoToFollow from "../components/who-to-follow";
import { Colors } from "../styles/colors";
import {
  Wrapper,
  Main,
  MainTitle,
  Sidebar,
  Seperator,
  FollowBtn,
} from "../components/lib";
import Icons from "../components/icons";
import Search from "../components/search";
import NewTweet from "../components/tweets/new-tweet";
import { ListItemList } from "../components/tweets/list-item-list";

const SearchWrapper = styled.div`
  padding-bottom: 20px;
`;

const TitleText = styled.h2``;

function Home() {
  return (
    <Wrapper>
      <Main>
        <MainTitle>
          <TitleText>Home</TitleText>
        </MainTitle>
        <NewTweet />
        <Seperator />

        <ListItemList
          filterListItems={(li) => Boolean(li.canDelete)}
          noListItems={
            <p>
              Hey there! Welcome to your bookshelf reading list. Get started by
              heading over to the Discover page to add books to your list.
            </p>
          }
          noFilteredListItems={
            <p>
              Looks like you've finished all your books! Check them out in your{" "}
            </p>
          }
        />
      </Main>
      <Sidebar>
        <SearchWrapper>
          <Search placeHolderText="Search Presence" />
        </SearchWrapper>
        <TrendsForYou />
        <WhoToFollow />
      </Sidebar>
    </Wrapper>
  );
}

export { Home };
