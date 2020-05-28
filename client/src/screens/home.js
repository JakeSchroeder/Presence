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
import { TweetRow } from "../components/tweets/tweet-row";
import { useTweetsByUser } from "../utils/tweets";
import { useAuth } from "../context/authContext";

const TweetListUl = styled.ul`
  margin: 0;
  padding: 0;
`;

const SearchWrapper = styled.div`
  padding-bottom: 20px;
`;

const TitleText = styled.h2``;

function Home() {
  const { user } = useAuth();
  const { tweets, status, error, isLoading, isError } = useTweetsByUser(
    `${user.id}`
  );

  return (
    <Wrapper>
      <Main>
        <MainTitle>
          <TitleText>Home</TitleText>
        </MainTitle>
        <NewTweet />
        <Seperator />
        {isError ? <p>{error.message}</p> : null}
        {tweets.length ? (
          <>
            <TweetListUl>
              {tweets.map((tweet) => (
                <li key={tweet._id}>
                  <TweetRow key={tweet._id} tweet={tweet} />
                </li>
              ))}
            </TweetListUl>
          </>
        ) : (
          "Error"
        )}
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
