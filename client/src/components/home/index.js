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

const SearchWrapper = styled.div`
  padding-bottom: 20px;
`;

const TitleText = styled.h2``;

const Home = () => {
  // useEffect(() => {
  //   axios.get("/api/tweet");
  // }, []);

  return (
    <Wrapper>
      <Main>
        <MainTitle>
          <TitleText>Home</TitleText>
        </MainTitle>
        <NewTweet />
        <Seperator />
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
};

export default Home;
