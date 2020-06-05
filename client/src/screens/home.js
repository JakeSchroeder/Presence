import React, { useState, useContext } from "react";
import styled from "styled-components";
import TrendsForYou from "../components/trends-for-you";
import WhoToFollow from "../components/who-to-follow";
import { Colors } from "../styles/colors";
import {
  // Wrapper,
  Main,
  MainTitle,
  Sidebar,
  Seperator,
  FollowBtn,
  Spinner,
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
  height: 53px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TitleText = styled.h2``;

const SpinnerWrapper = styled.div`
  padding-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Home() {
  const { user } = useAuth();
  const { tweets, error, status, isFetching } = useTweetsByUser(`${user.id}`);

  return (
    // <Wrapper>
    <>
      <Main>
        <MainTitle>
          <TitleText>Home</TitleText>
        </MainTitle>
        <NewTweet />
        <Seperator />
        {status === "loading" ? (
          <SpinnerWrapper>
            <Spinner width={25} height={25} />
          </SpinnerWrapper>
        ) : status === "error" ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <TweetListUl>
              {tweets.map((tweet) => (
                <li key={tweet._id}>
                  <TweetRow key={tweet._id} tweet={tweet} />
                </li>
              ))}
            </TweetListUl>
          </>
        )}
      </Main>
      <Sidebar>
        <SearchWrapper>
          <Search placeHolderText="Search Presence" />
        </SearchWrapper>
        <TrendsForYou />
        <WhoToFollow />
      </Sidebar>
    </>
    // </Wrapper>
  );
}

export { Home };
