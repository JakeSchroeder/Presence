import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Icons from "../../icons";
import { Colors } from "../../../styles/colors";
import Search from "../../search";

const MessageModalWrapper = styled.div`
  border-radius: 15px;
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  min-height: 400px;

  height: 650px;

  max-width: 80vw;

  max-height: 90vh;
  background: white;
  min-width: 600px;
`;

const MessageModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${Colors.border};
  padding: 5px 15px;
`;

const MessageTitle = styled.h2`
  margin: 10px;
`;

const MessageComment = styled.input`
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

const MessageContent = styled.div`
  height: 100%;
`;

const MessageSend = styled.div`
  margin-left: 10px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:hover {
    background: ${Colors.hover};
  }
  & svg {
    fill: ${Colors.primary};
    width: 22.5px;
  }
`;

const MessageFooter = styled.div`
  border-top: 1px solid ${Colors.border};
  padding: 15px;
  display: flex;
`;

const SearchWrapperModal = styled.div`
  padding: 15px;
`;

const CloseBtn = styled.div`
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${Colors.hover};
  }
  & svg {
    fill: ${Colors.primary};
    width: 22.5px;
  }
`;

const NextButton = styled.button`
  outline: 0;
  min-height: 30px;
  padding: 0 15px;
  border-radius: 999px;
  font-size: 1rem;
  background: ${Colors.primary};
  border: 0;
  color: white;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInner = styled.div`
  margin: 10px 5px;
  width: 100%;
`;

const SearchForm = styled.form`
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

function NewMessage({ closeModal }) {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState();

  function handleSearchClick(event) {
    event.preventDefault();
    setHasSearched(true);
    setQuery(event.target.elements.searchUserNew.value);
  }

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <MessageModalWrapper>
      <MessageModalHeader>
        <TitleWrapper>
          <CloseBtn onClick={closeModal}>{Icons.close}</CloseBtn>
          <MessageTitle>New Message</MessageTitle>
        </TitleWrapper>
        <NextButton>Next</NextButton>
      </MessageModalHeader>
      <MessageContent>
        <SearchWrapperModal>
          <SearchForm onSubmit={handleSearchClick}>
            <SearchWrapper>
              <SearchIcon>{Icons.search}</SearchIcon>
              <SearchInput id="searchUserNew" placeholder="Search people" />
            </SearchWrapper>
          </SearchForm>
        </SearchWrapperModal>
      </MessageContent>
      {/* <MessageFooter>
      <MessageComment type="text" placeholder="Add a comment" />
      <MessageSend>{Icons.sendMessage}</MessageSend>
    </MessageFooter> */}
    </MessageModalWrapper>
  );
}

export default NewMessage;
