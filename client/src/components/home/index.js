import React from "react";
import styled from "styled-components";
import TrendsForYou from "../trends-for-you";
import WhoToFollow from "../who-to-follow";
import { Colors, FollowBtn } from "../../utils";
import Icons from "../icons";
import Search from "../search";
import profile_src from "../../images/profile.png";
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
  height: 53px;
  padding: 0 15px;
  border-bottom: 1px solid ${Colors.border};
  display: flex;
  align-items: center;
`;

const HomeTitle = styled.h2``;

const TweetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
`;

const TweetInputWrapper = styled.div`
  display: flex;
`;

const UserImg = styled.img`
  border-radius: 50%;
`;

const TweetInput = styled.input`
  width: 100%;
  font-size: 1rem;
  border: 0;
  outline: 0;
  padding: 10px;
`;

const MediaInputWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MediaInnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MediaImg = styled.div`
  cursor: pointer;
  border-radius: 50%;
  padding: 5px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(29, 161, 242, 0.1);
  }

  & svg {
    width: 100%;
    fill: ${Colors.primary};
  }
`;

const MediaPolls = styled.div`
  cursor: pointer;
  border-radius: 50%;
  padding: 5px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(29, 161, 242, 0.1);
  }

  & svg {
    width: 100%;
    fill: ${Colors.primary};
  }
`;

const TweetSubmit = styled.button`
  min-height: 40px;
  cursor: pointer;

  border-radius: 999px;
  padding: 0 20px;
  border: 0;
  outline: 0;
  background: ${Colors.primary};
  color: white;
  font-size: 16px;
  font-family: inherit;

  &:hover {
    background: rgb(26, 145, 218);
  }
`;

const Seperator = styled.div`
  height: 10px;
  background: ${Colors.border};
  width: 100%;
`;

const NewTweet = () => {
  return (
    <>
      <TweetWrapper>
        <TweetInputWrapper>
          <UserImg src={profile_src} alt="User Image" />
          <TweetInput type="text" placeholder="What's happening?" />
        </TweetInputWrapper>
        <MediaInputWrapper>
          <MediaInnerWrapper>
            <MediaImg>{Icons.img}</MediaImg>
            <MediaPolls>{Icons.polls}</MediaPolls>
          </MediaInnerWrapper>
          <TweetSubmit>Tweet</TweetSubmit>
        </MediaInputWrapper>
      </TweetWrapper>
      <Seperator />
    </>
  );
};

const Home = () => {
  return (
    <Wrapper>
      <Body>
        <HomeTitleWrapper>
          <HomeTitle>Home</HomeTitle>
        </HomeTitleWrapper>
        <NewTweet />
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

export default Home;
