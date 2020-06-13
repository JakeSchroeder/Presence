import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import Icons from "../icons";
import { useTweetSearch } from "../../utils/tweets";
import { useHistory } from "react-router-dom";

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

// const SearchIconWrapper = styled.div`
//     padding-left: 10px;
//     background: #E6ECF0;
//     display: flex;
//     align-items: center;
//     border-top-left-radius: 999px;
//     border-bottom-left-radius: 999px;
// `;

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

const SearchForm = styled.form`
  width: 100%;
`;

const Search = ({ placeHolderText }) => {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState();
  const { tweets, error, status, isFetching } = useTweetSearch(query);

  useEffect(() => {
    if (hasSearched) {
      history.push("/explore");
    }
  }, [hasSearched]);

  function handleSearchClick(event) {
    event.preventDefault();
    setHasSearched(true);
    setQuery(event.target.elements.search.value);
  }

  return (
    <SearchForm onSubmit={handleSearchClick}>
      <SearchWrapper>
        <SearchIcon>{Icons.search}</SearchIcon>
        <SearchInput id="search" type="text" placeholder="Search Presence" />
      </SearchWrapper>
    </SearchForm>
  );
};

export default Search;
