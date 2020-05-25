import React, { useState, useContext } from "react";
import styled from "styled-components";
import TrendsForYou from "../trends-for-you";
import WhoToFollow from "../who-to-follow";
import { Colors, FollowBtn } from "../../utils";
import {
  Wrapper,
  Main,
  MainTitle,
  Sidebar,
  Seperator,
} from "../../utils/elements";
import Icons from "../icons";
import Search from "../search";
import NewTweet from "../tweets/new-tweet";
import axios from "axios";
import { ListItemList } from "../tweets/list-item-list";

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

export default Home;
