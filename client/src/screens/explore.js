import React, { useState, useEffect } from "react";
import { Tabs, TabPanel } from "react-tabs";
import Search from "../components/search";
import styled from "styled-components";
import Icons from "../components/icons";
import { Colors } from "../styles/colors";
import {
  FollowBtn,
  StyledTab,
  StyledTabList,
  Wrapper,
  Main,
  Sidebar,
  MainTitle,
  Spinner,
} from "../components/lib";

import WhoToFollow from "../components/who-to-follow";
import { useTweetSearch, refetchTweetSearchQuery } from "../utils/tweets";
import { TweetRow } from "../components/tweets/tweet-row";

const SearchForm = styled.form`
  width: 100%;
`;

const SearchOuter = styled.div`
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

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;

  &:focus > input {
    border: 1px solid ${Colors.primary};
    background: white;
  }
  &:focus svg {
    background: black;
    fill: ${Colors.primary};
  }
`;

const SearchInput = styled.input`
  height: 38px;
  width: 100%;
  border-radius: 999px;
  font-size: 15px;
  background: #e6ecf0;
  border: 1px solid transparent;
  padding: 10px 10px 10px 50px;
  outline: none;
  color: ${Colors.body};

  &:focus {
    background: white;
    color: ${Colors.title};
    border-color: ${Colors.primary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
  min-width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: ${Colors.body};
    height: 18.75px;
  }
`;

const TitleText = styled.h2``;

const TweetListUl = styled.ul`
  margin: 0;
  padding: 0;
`;

function Explore() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState();
  const { tweets, error, isLoading, isError, isSuccess } = useTweetSearch(
    query
  );

  console.log(tweets);

  useEffect(() => {
    return () => refetchTweetSearchQuery();
  }, []);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabSwitch = (index) => {
    setTabIndex(index);
  };

  function handleSearchClick(event) {
    event.preventDefault();
    setHasSearched(true);
    setQuery(event.target.elements.search.value);
  }

  return (
    <Wrapper>
      <Main>
        <SearchOuter>
          <SearchForm onSubmit={handleSearchClick}>
            <SearchWrapper>
              <SearchIcon>{Icons.search}</SearchIcon>
              <SearchInput
                id="search"
                type="text"
                placeholder="Search Presence"
              />
            </SearchWrapper>
          </SearchForm>
        </SearchOuter>
        {isError ? (
          <div css={{ color: "red" }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
        <div>
          {hasSearched ? null : (
            <>
              {isLoading ? (
                <div css={{ width: "100%", margin: "auto" }}>
                  <Spinner />
                </div>
              ) : isSuccess && tweets.length ? (
                <p>Here you go! Find more books with the search bar above.</p>
              ) : isSuccess && !tweets.length ? (
                <p>
                  Hmmm... I couldn't find any books to suggest for you. Sorry.
                </p>
              ) : null}
            </>
          )}
          {tweets.length ? (
            // <Profiler
            //   id="Explore Tweets Screen Tweet List"
            //   metadata={{ query, tweetCount: tweets.length }}
            // >

            <TweetListUl>
              {tweets.map((tweet) => (
                <li>
                  <TweetRow key={tweet._id} tweet={tweet} />
                </li>
              ))}
            </TweetListUl>
          ) : // </Profiler>
          hasSearched ? (
            <div
              css={{ marginTop: 20, fontSize: "1.2em", textAlign: "center" }}
            >
              {isLoading ? (
                <div css={{ width: "100%", margin: "auto" }}>
                  <Spinner />
                </div>
              ) : (
                <p>
                  Hmmm... I couldn't find any books with the query "{query}."
                  Please try another.
                </p>
              )}
            </div>
          ) : null}
        </div>

        {/* <TweetList tweets={tweets} /> */}
        {/* {isError ? (
          <div css={{ color: "red" }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null}
        {tweets.length ? (
          <TweetList tweets={tweets} />
        ) : hasSearched ? (
          <p>
            Hmmm... I couldn't find any books with the query "{query}." Please
            try another.
          </p>
        ) : null} */}
        {/* <Tabs
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
            
          </TabPanel>
          <TabPanel>{tweets ? <TweetList tweets={tweets} /> : null}</TabPanel>
        </Tabs> */}
      </Main>
      <Sidebar>
        <WhoToFollow />
      </Sidebar>
    </Wrapper>
  );
}

export { Explore };
