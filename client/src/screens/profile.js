import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { withRouter, useLocation } from "react-router-dom";
import TrendsForYou from "../components/trends-for-you";
import WhoToFollow from "../components/who-to-follow";
import { Tabs, TabPanel } from "react-tabs";
import { Colors } from "../styles/colors";
import {
  FollowBtn,
  StyledTab,
  StyledTabList,
  // Wrapper,
  Main,
  Sidebar,
  MainTitle,
  GoBackBtn,
  Spinner,
} from "../components/lib";
import Icons from "../components/icons";
import Search from "../components/search";
import { TweetRow } from "../components/tweets/tweet-row";
import profile_src from "../images/default_profile_200x200.png";
import { useTweetsByUser } from "../utils/tweets";

import { useUser } from "../utils/users";

const SearchWrapper = styled.div`
  height: 53px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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

function Profile({ history }) {
  // const { state: authState } = useContext(AuthContext);
  // const { displayName, userName, id } = authState.user;
  const { state } = useLocation();
  const {
    user,
    status: userStatus,
    error: userError,
    isFetching: userIsFetching,
  } = useUser(state.userId);
  const {
    tweets,
    error: tweetsError,
    status: tweetsStatus,
    isFetching: tweetsIsFetching,
  } = useTweetsByUser(`${state.userId}`);

  // const { userName, displayName, id } = user.author;
  // const [user, setUser] = useState(null);
  // const [userTweets, setUserTweets] = useState(null);

  // const getTweetsByUser = () => {

  // };

  // useEffect(() => {
  //   axios.get(`/api/user/${state.userId}`).then((user) => {
  //     console.log(user);
  //     setUser(user.data);
  //     setIsLoading(false);
  //   });

  // axios
  //   .get(`/api/tweet/${params.state.userId}/all`)
  //   .then((res) => {
  //     console.log(res);
  //     setUserTweets(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    // <Wrapper>
    <>
      <Main>
        <>
          <MainTitle>
            <GoBackBtn
              onClick={() => {
                history.goBack();
              }}
            />
            <TitleText>{user.displayName}</TitleText>
          </MainTitle>
          {userStatus === "loading" ? (
            <SpinnerWrapper>
              <Spinner width={25} height={25} />
            </SpinnerWrapper>
          ) : userStatus === "error" ? (
            <p>error: {userError.message}</p>
          ) : (
            <>
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
                    {tweetsStatus === "loading" ? (
                      <SpinnerWrapper>
                        <Spinner width={25} height={25} />
                      </SpinnerWrapper>
                    ) : tweetsStatus === "error" ? (
                      <p>error: {tweetsError.message}</p>
                    ) : (
                      <TweetListUl>
                        {tweets.map((tweet) => (
                          <li key={tweet._id}>
                            <TweetRow key={tweet._id} tweet={tweet} />
                          </li>
                        ))}
                      </TweetListUl>
                    )}
                  </TabPanel>
                  <TabPanel>
                    {/* <ListItemList
                          filterListItems={(li) => Boolean(li.tweet.replies > 0)}
                          noListItems={
                            <p>
                              Hey there! Welcome to your bookshelf reading list. Get
                              started by heading over to the Discover page to add books
                              to your list.
                            </p>
                          }
                          noFilteredListItems={
                            <p>
                              Looks like you've finished all your books! Check them out
                              in your{" "}
                            </p>
                          }
                        /> */}
                  </TabPanel>
                  <TabPanel>
                    {/* <ListItemList
                          filterListItems={(li) => Boolean(li.tweet.likes > 0)}
                          noListItems={
                            <p>
                              Hey there! Welcome to your bookshelf reading list. Get
                              started by heading over to the Discover page to add books
                              to your list.
                            </p>
                          }
                          noFilteredListItems={
                            <p>
                              Looks like you've finished all your books! Check them out
                              in your{" "}
                            </p>
                          }
                        /> */}
                  </TabPanel>
                </Tabs>
              </ProfileTabs>
            </>
          )}
        </>
      </Main>
      <Sidebar>
        <SearchWrapper>
          <Search placeHolderText="Search Presence" />
        </SearchWrapper>
        <TrendsForYou />
        <WhoToFollow />
      </Sidebar>
    </>
  );
}

export { Profile };
