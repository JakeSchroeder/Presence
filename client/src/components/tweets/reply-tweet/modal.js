import React from "react";
import NewTweetReply from "./index";
import styled from "styled-components";
import Icons from "../../icons";
import { Colors } from "../../../styles/colors";

import profile_src from "../../../images/profile.png";
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

const TweetWrapper = styled.div`
  position: relative;
  display: flex;

  padding: 20px 10px 0 10px;

  ${({ withReply }) =>
    withReply
      ? null
      : `&:hover {
    background: ${Colors.light};
  }`}
`;

const TweetImgWrapper = styled.div`
  margin: 0 5px;
  ${({ withReply }) =>
    withReply
      ? `
  position: relative;
    &:before {
      content: "";
      width: 2px;
      height: 200%;
      background: ${Colors.border};
      position: absolute;
      z-index: -1;
      left: 50%;
    }
  `
      : null}
`;

const TweetImg = styled.img`
  border-radius: 50%;
`;

const TweetContent = styled.div`
  margin: 0 5px;
  padding-bottom: 10px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DisplayName = styled.p`
  font-weight: bold;
  color: ${Colors.title};
`;

const UserName = styled.p`
  color: ${Colors.body};
  margin-left: 5px;
`;

const TweetDescription = styled.p`
  color: ${Colors.title};
`;

const NewTweetReplyModal = ({ closeNewReply, tweet, showSuccessToast }) => {
  // console.log(showSuccessToast);
  return (
    <NewTweetModalWrapper>
      <NewTweetModalHeader>
        <TitleWrapper>
          <CloseBtn onClick={closeNewReply}>{Icons.close}</CloseBtn>
        </TitleWrapper>
      </NewTweetModalHeader>
      <NewTweetContent>
        <TweetWrapper withReply>
          <TweetImgWrapper withReply>
            <TweetImg src={profile_src} />
          </TweetImgWrapper>
          <TweetContent>
            <NameWrapper>
              <DisplayName>{tweet.author.displayName}</DisplayName>

              <UserName>@{tweet.author.userName}</UserName>
            </NameWrapper>
            <TweetDescription>{tweet.content}</TweetDescription>
          </TweetContent>
        </TweetWrapper>
        <NewTweetReply
          showSuccessToast={showSuccessToast}
          closeNewReply={closeNewReply}
          tweet={tweet}
        />
      </NewTweetContent>
      {/* <NewTweetFooter>
          <NewTweetComment type="text" placeholder="Add a comment" />
          <NewTweetSend>{Icons.sendNewTweet}</NewTweetSend>
        </NewTweetFooter> */}
    </NewTweetModalWrapper>
  );
};

export default NewTweetReplyModal;
