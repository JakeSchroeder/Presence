import React from "react";
import styled from "styled-components";
import { Colors } from "../../utils";
import Icons from "../icons";

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

const Search = ({ placeHolderText }) => {
  return (
    <SearchWrapper>
      <SearchIcon>{Icons.search}</SearchIcon>

      <SearchInput type="text" placeholder={placeHolderText} />
    </SearchWrapper>
  );
};

export default Search;
