import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import TrendsForYou from "../trends-for-you";
import WhoToFollow from "../who-to-follow";
import {
  Colors,
  FollowBtn,
  GoBackBtn,
  StyledTab,
  StyledTabList,
} from "../../utils";
import { Tabs, TabPanel } from "react-tabs";

import Icons from "../icons";
import Search from "../search";
import profile_src from "../../images/default_profile_200x200.png";
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
  padding-bottom: 20px;
`;

const HomeTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 53px;
  padding: 0 15px;
  border-bottom: 1px solid ${Colors.border};
`;

const HomeTitle = styled.h2``;

const ProfileWrapper = styled.div``;

const ProfileContent = styled.div`
  padding: 10px 15px;
  margin-bottom: 5px;
`;

const ProfileBG = styled.div`
  padding-bottom: calc(100% / 3);
  background: ${Colors.body};
`;

const ProfileImg = styled.img`
  min-width: 49px;
  max-width: 142px;
  border: 4px solid white;
  border-radius: 9999px;
  margin-top: -18%;
`;

const NameWrapper = styled.div`
  margin-bottom: 10px;
`;

const DisplayName = styled.h2``;

const UserName = styled.p``;

const FollowingWrapper = styled.div`
  display: flex;
`;

const NumFollowing = styled.p``;

const NumFollowers = styled.p`
  margin-right: 10px;
`;

const Num = styled.span`
  color: ${Colors.title};
  font-weight: bold;
`;

const ProfileTabs = styled.div``;

const Profile = ({ history }) => {
  return (
    <Wrapper>
      <Body>
        <HomeTitleWrapper>
          <GoBackBtn
            onClick={() => {
              history.goBack();
            }}
          >
            {Icons.arrowLeft}
          </GoBackBtn>
          <HomeTitle>Jake Schroeder</HomeTitle>
        </HomeTitleWrapper>
        <ProfileWrapper>
          <ProfileBG></ProfileBG>
          <ProfileContent>
            <ProfileImg src={profile_src} />

            <NameWrapper>
              <DisplayName>Jake Schroeder</DisplayName>
              <UserName>@JakeSch99392224</UserName>
            </NameWrapper>
            <FollowingWrapper>
              <NumFollowers>
                <Num>0</Num> Followers
              </NumFollowers>
              <NumFollowing>
                <Num>0</Num> Following
              </NumFollowing>
            </FollowingWrapper>
          </ProfileContent>
        </ProfileWrapper>
        <ProfileTabs>
          <Tabs>
            <StyledTabList>
              <StyledTab>Tweets</StyledTab>
              <StyledTab>Tweets & replies</StyledTab>
              <StyledTab>Likes</StyledTab>
            </StyledTabList>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </Tabs>
        </ProfileTabs>
      </Body>
      <SidebarWrapper>
        <SearchWrapper>
          <Search placeHolderText="Search Twitter" />
        </SearchWrapper>
        <TrendsForYou />
        <WhoToFollow />

        <SidebarFooter>© 2020 Presence</SidebarFooter>
      </SidebarWrapper>
    </Wrapper>
  );
};

export default withRouter(Profile);
