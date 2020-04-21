import React from "react";
import Feed from "../feed";
import Search from "../search";
import styled from "styled-components";
import { Colors, FollowBtn, StyledTab, StyledTabList } from "../../utils";
import { Tabs, TabPanel } from "react-tabs";

import WhoToFollow from "../who-to-follow";
// import {useAuthDataContext} from "../auth-provider";
import Tweets from "../tweets";
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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`;

const Body = styled.div`
  width: 100%;

  height: 100%;
  border-left: 1px solid ${Colors.border};
  border-right: 1px solid ${Colors.border};
`;

const SidebarWrapper = styled.div`
  padding: 20px;
`;

const SidebarFooter = styled.p`
  margin-top: 15px;
`;

const SearchWrapper = styled.div`
  padding: 20px 15px;
`;

const Explore = () => {
  return (
    <Wrapper>
      <Body>
        <SearchWrapper>
          <Search placeHolderText="Search Twitter" />
        </SearchWrapper>
        <Tabs>
          <StyledTabList>
            <StyledTab>For You</StyledTab>
            <StyledTab>Trending</StyledTab>
            <StyledTab>News</StyledTab>
          </StyledTabList>
          <TabPanel>
            <Tweets />
          </TabPanel>
          <TabPanel>trending content feed</TabPanel>
          <TabPanel>news content feed</TabPanel>
        </Tabs>
      </Body>
      <SidebarWrapper>
        <WhoToFollow />

        <SidebarFooter>© 2020 Presence</SidebarFooter>
      </SidebarWrapper>
    </Wrapper>
  );
};

export default Explore;
