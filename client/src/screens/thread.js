import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter, Link, useParams } from "react-router-dom";
import { useTweetThread, refetchTweetThread } from "../utils/tweets";
import { TweetThread } from "../components/tweets/tweet-thread";
import { TweetRow } from "../components/tweets/tweet-row";
import Icons from "../components/icons";
import { Colors } from "../styles/colors";
// import TweetList from "../tweets";
import {
  // Wrapper,
  Main,
  Sidebar,
  MainTitle,
  GoBackBtn,
  Spinner,
} from "../components/lib";
import Search from "../components/search";

import WhoToFollow from "../components/who-to-follow";
// import TweetList from "../components/tweets";

const SearchWrapper = styled.div`
  height: 53px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const TitleText = styled.h2``;

const TweetBody = styled.div``;

const TweetListUl = styled.ul`
  margin: 0;
  padding: 0;
`;

const SpinnerWrapper = styled.div`
  padding-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ErrorWrapper = styled.div`
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ExistText = styled.h1`
  font-size: 23px;
  margin-bottom: 40px;
`;

function Thread({ history }) {
  const { tweetId } = useParams();
  // console.log(tweetId);
  const { tweets, status, error, isFetching } = useTweetThread(tweetId);

  // useEffect(() => {
  //   return () => refetchTweetThread(tweetId);
  // }, []);

  return (
    // <Wrapper>
    <>
      <Main>
        <MainTitle>
          <GoBackBtn
            onClick={() => {
              history.goBack();
            }}
          />
          <TitleText>Tweet</TitleText>
        </MainTitle>
        {status === "loading" ? (
          <SpinnerWrapper>
            <Spinner width={25} height={25} />
          </SpinnerWrapper>
        ) : status === "error" ? (
          <p>{error.message}</p>
        ) : tweets.length > 0 ? (
          <>
            <TweetThread tweet={tweets[0]} />
            <TweetListUl>
              {tweets.slice(1).map((tweet) => (
                <li key={tweet._id}>
                  <TweetRow key={tweet._id} tweet={tweet} />
                </li>
              ))}
            </TweetListUl>
          </>
        ) : (
          <ErrorWrapper>
            <ExistText>Sorry, that page doesn’t exist!</ExistText>
            <p>
              Why not try a{" "}
              <Link style={{ color: `${Colors.primary}` }} to="/explore">
                search
              </Link>{" "}
              to find something else?
            </p>
          </ErrorWrapper>
        )}

        {/* {tweet ? (
          <>
            <TweetThread tweet={tweet} />
            <TweetList
              replying
              parent={tweet.author.userName}
              tweets={tweet.comments}
            />
          </>
        ) : null} */}

        {/* {tweet.replies > 0 ? <Tweet withReply tweet=} */}
        {/* <TweetThread tweet={tweet}></TweetThread> */}
        {/* <Tweet withReply tweet={tweet}></Tweet> */}
      </Main>
      <Sidebar>
        <SearchWrapper>
          <Search placeHolderText="Search Presence" />
        </SearchWrapper>
        <WhoToFollow />
      </Sidebar>
    </>
  );
}

export { Thread };
