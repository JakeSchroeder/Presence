import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter, Link, useParams } from "react-router-dom";
import { useTweetThread, refetchTweetThread } from "../utils/tweets";
import { TweetThread } from "../components/tweets/tweet";
import { TweetRow } from "../components/tweets/tweet-row";
import Icons from "../components/icons";
// import TweetList from "../tweets";
import {
  Wrapper,
  Main,
  Sidebar,
  MainTitle,
  GoBackBtn,
} from "../components/lib";
import Search from "../components/search";
import WhoToFollow from "../components/who-to-follow";
// import TweetList from "../components/tweets";

const SearchWrapper = styled.div`
  padding-bottom: 20px;
`;

const TitleText = styled.h2``;

const TweetBody = styled.div``;

const TweetListUl = styled.ul`
  margin: 0;
  padding: 0;
`;

function Thread({ history }) {
  const { tweetId } = useParams();
  // console.log(tweetId);
  const { tweets, status, error, isLoading, isError } = useTweetThread(
    `${tweetId}`
  );

  // useEffect(() => {
  //   return () => refetchTweetThread(tweetId);
  // }, []);

  return (
    <Wrapper>
      <Main>
        <MainTitle>
          <GoBackBtn
            onClick={() => {
              history.goBack();
            }}
          />
          <TitleText>Tweet</TitleText>
        </MainTitle>

        {isError ? <p>{error.message}</p> : null}
        {tweets.length ? (
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
          "Error"
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
    </Wrapper>
  );
}

export { Thread };
