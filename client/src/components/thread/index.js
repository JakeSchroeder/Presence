import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter, Link, useParams } from "react-router-dom";
import Icons from "../icons";
import { Colors } from "../../utils";
import { TweetThread, Tweet } from "../tweets/tweet";
import fake_data from "../../data/data.json";
import axios from "axios";
// import TweetList from "../tweets";
import {
  Wrapper,
  Main,
  Sidebar,
  MainTitle,
  GoBackBtn,
} from "../../utils/elements";
import Search from "../search";
import WhoToFollow from "../who-to-follow";
import TweetList from "../tweets";

const SearchWrapper = styled.div`
  padding-bottom: 20px;
`;

const TitleText = styled.h2``;

const TweetBody = styled.div``;

const Thread = ({ history }) => {
  let params = useParams();
  const [tweet, setTweet] = useState(null);

  // // const findTweetById = () => {
  // //   fake_data.tweets.keys
  // // };

  // const findByTweetId = (obj, id) => {
  //   var result;
  //   for (var p in obj) {
  //     if (obj._id === id) {
  //       return obj;
  //     } else {
  //       if (typeof obj[p] === "object") {
  //         result = findByTweetId(obj[p], id);
  //         if (result) {
  //           return result;
  //         }
  //       }
  //     }
  //   }
  //   return result;
  // };

  // let tweet = findByTweetId(fake_data, params._id);

  useEffect(() => {
    console.log(params);
    axios
      .get(`/api/tweet/${params.id}`)
      .then((res) => {
        console.log(res);
        setTweet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        {tweet ? (
          <>
            <TweetThread tweet={tweet} />
            <TweetList
              replying
              parent={tweet.author.userName}
              tweets={tweet.comments}
            />
          </>
        ) : null}
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
};

export default withRouter(Thread);
