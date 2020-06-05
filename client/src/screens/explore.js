import React, { useState, useEffect } from "react";
import { Tabs, TabPanel } from "react-tabs";
import Search from "../components/search";
import styled from "styled-components";
import Icons from "../components/icons";
import { Colors } from "../styles/colors";
import { Link } from "react-router-dom";
import {
  FollowBtn,
  StyledTab,
  StyledTabList,
  // Wrapper,
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
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${Colors.border};
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
  text-align: center;
`;

const ExistText = styled.h1`
  font-size: 23px;
  margin-bottom: 20px;
`;

const SidebarInner = styled.div`
  margin-top: 10px;
`;

function Explore() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState();
  const { tweets, error, status, isFetching } = useTweetSearch(query);

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
    // <Wrapper>
    <>
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
        {/* {isError ? (
          <div css={{ color: "red" }}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null} */}
        {status === "loading" ? (
          <SpinnerWrapper>
            <Spinner width={25} height={25} />
          </SpinnerWrapper>
        ) : status === "error" ? (
          <p>Error: {error.message}</p>
        ) : tweets.length ? (
          <TweetListUl>
            {tweets.map((tweet) => (
              <li key={tweet._id}>
                <TweetRow key={tweet._id} tweet={tweet} />
              </li>
            ))}
          </TweetListUl>
        ) : hasSearched ? (
          <ErrorWrapper>
            <ExistText>No results for "{query}"</ExistText>
            <p>
              The term you entered did not bring up any results. You may have
              mistyped your term, try researching.
            </p>
          </ErrorWrapper>
        ) : null}
      </Main>
      <Sidebar top>
        <SidebarInner>
          <WhoToFollow />
        </SidebarInner>
      </Sidebar>
    </>
    // </Wrapper>
  );
}

export { Explore };
