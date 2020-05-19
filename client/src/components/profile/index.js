import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { withRouter, useParams, useLocation } from "react-router-dom";
import TrendsForYou from "../trends-for-you";
import WhoToFollow from "../who-to-follow";
import { Colors, FollowBtn, StyledTab, StyledTabList } from "../../utils";
import { AuthContext } from "../../App";
import { Tabs, TabPanel } from "react-tabs";
import {
  Wrapper,
  Main,
  Sidebar,
  MainTitle,
  GoBackBtn,
} from "../../utils/elements";
import Icons from "../icons";
import Search from "../search";
import profile_src from "../../images/default_profile_200x200.png";
import axios from "axios";
import TweetList from "../tweets";

const SearchWrapper = styled.div`
  padding-bottom: 20px;
`;

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

const TitleText = styled.h2``;

const ProfileTabs = styled.div``;

const Profile = ({ history }) => {
  // const { state: authState } = useContext(AuthContext);
  // const { displayName, userName, id } = authState.user;
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const [userTweets, setUserTweets] = useState(null);

  // const getTweetsByUser = () => {

  // };

  useEffect(() => {
    axios.get(`/api/user/${state.userId}`).then((user) => {
      console.log(user);
      setUser(user.data);
      setIsLoading(false);
    });

    // axios
    //   .get(`/api/tweet/${params.state.userId}/all`)
    //   .then((res) => {
    //     console.log(res);
    //     setUserTweets(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Wrapper>
      <Main>
        {isLoading ? (
          "...loading"
        ) : (
          <>
            <MainTitle>
              <GoBackBtn
                onClick={() => {
                  history.goBack();
                }}
              />
              <TitleText>{user.userName}</TitleText>
            </MainTitle>
            <ProfileWrapper>
              <ProfileBG></ProfileBG>
              <ProfileContent>
                <ProfileImg src={profile_src} />

                <NameWrapper>
                  <DisplayName>{user.displayName}</DisplayName>
                  <UserName>@{user.userName}</UserName>
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
                <TabPanel>
                  {/* {userTweets ? <TweetList tweets={userTweets} /> : null} */}
                </TabPanel>
                <TabPanel>
                  {/* {userTweets > 0 ? (
                 <TweetList
                   replying
                   parent={userTweets.author.userName}
                   tweets={userTweets.comments}
                 />
               ) : null} */}
                </TabPanel>
                <TabPanel></TabPanel>
              </Tabs>
            </ProfileTabs>
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
    </Wrapper>
  );
};

export default withRouter(Profile);
