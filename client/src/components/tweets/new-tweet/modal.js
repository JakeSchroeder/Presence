import React from "react";
import NewTweet from "./index";
import styled from "styled-components";
import Icons from "../../icons";
import { Colors } from "../../../styles/colors";

const NewTweetModalWrapper = styled.div`
  border-radius: 15px;
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  min-height: 290px;
  max-width: 80vw;

  max-height: 90vh;
  background: white;
  min-width: 600px;
`;

const NewTweetModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${Colors.border};
  padding: 5px 15px;
`;

const NewTweetTitle = styled.h2`
  margin: 10px;
`;

const NewTweetComment = styled.input`
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

const NewTweetContent = styled.div`
  height: 100%;
`;

const NewTweetSend = styled.div`
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

const NewTweetFooter = styled.div`
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

const NewTweetModal = ({ closeNewTweet }) => {
  return (
    <NewTweetModalWrapper>
      <NewTweetModalHeader>
        <TitleWrapper>
          <CloseBtn onClick={closeNewTweet}>{Icons.close}</CloseBtn>
        </TitleWrapper>
      </NewTweetModalHeader>
      <NewTweetContent>
        <NewTweet isModal closeNewTweet={closeNewTweet} />
      </NewTweetContent>
      {/* <NewTweetFooter>
          <NewTweetComment type="text" placeholder="Add a comment" />
          <NewTweetSend>{Icons.sendNewTweet}</NewTweetSend>
        </NewTweetFooter> */}
    </NewTweetModalWrapper>
  );
};

export default NewTweetModal;
