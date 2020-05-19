import React, { useState, useEffect } from "react";
import Feed from "../feed";
import Search from "../search";
import styled from "styled-components";
import { Colors, FollowBtn, StyledTab, StyledTabList } from "../../utils";
import { Wrapper, Main, Sidebar, MainTitle } from "../../utils/elements";
import { Tabs, TabPanel } from "react-tabs";
import WhoToFollow from "../who-to-follow";
//import useFetch from "../../hooks/useFetch";
// import {useAuthDataContext} from "../auth-provider";
import TweetList from "../tweets";
import fake_data from "../../data/data.json";
import axios from "axios";
// const simulatedFeedData = {
//     "tweets": [{
//         "_id": "546335",
//         "displayName": "Chaotic Joe",
//         "userName": "@chaosjoes",
//         "userAvatar": "../../../public/img/profile.png",
//         "tweetDesc": "a big time rush comeback would simply put us one step closer to the ultimate goal: a bts x btr collab. after that: world domination.",
//         "date": "12:46PM Apr 20, 2020",
//     }]
// }

const SearchWrapper = styled.div`
  height: 53px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  align-items: center;
`;

const SearchInner = styled.div`
  margin: 10px 5px;
  width: 100%;
`;

const TitleText = styled.h2``;

const Explore = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loadedTweets, setLoadedTweets] = useState(null);

  const handleTabSwitch = (index) => {
    setTabIndex(index);
    console.log(index);
  };

  useEffect(() => {
    console.log();
    //fetch data
    axios
      .get("api/tweet/all")
      .then((res) => {
        console.log(res);
        setLoadedTweets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <Main>
        <SearchWrapper>
          <SearchInner>
            <Search placeHolderText="Search Presence" />
          </SearchInner>
        </SearchWrapper>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => {
            handleTabSwitch(index);
          }}
        >
          <StyledTabList>
            <StyledTab>Trending</StyledTab>
            <StyledTab>News</StyledTab>
          </StyledTabList>

          <TabPanel>
            <MainTitle>
              <TitleText>United States trends</TitleText>
            </MainTitle>
            {/* <TweetList tweets={fake_data.tweets.trending} /> */}
          </TabPanel>
          <TabPanel>
            {loadedTweets ? <TweetList tweets={loadedTweets} /> : null}
          </TabPanel>
        </Tabs>
      </Main>
      <Sidebar>
        <WhoToFollow />
      </Sidebar>
    </Wrapper>
  );
};

export default Explore;
