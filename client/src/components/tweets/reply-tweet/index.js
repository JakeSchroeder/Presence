import React, { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../../App";
import { Colors } from "../../../styles/colors";
import { GenericBtn } from "../../../components/lib";
import Icons from "../../icons";
import styled from "styled-components";
import profile_src from "../../../images/profile.png";
import axios from "axios";
import useModal from "../../../hooks/useModal";
import Toast from "../../toast";
import { useCreateReply } from "../../../utils/tweets";
import { useAuth } from "../../../context/authContext";

const TweetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
`;

const TweetForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    background: ${Colors.hover};
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
    background: ${Colors.hover};
  }

  & svg {
    width: 100%;
    fill: ${Colors.primary};
  }
`;

// const TweetSubmit = styled.button`
//   min-height: 40px;
//   cursor: pointer;

//   border-radius: 999px;
//   padding: 0 20px;
//   border: 0;
//   outline: 0;
//   background: ${Colors.primary};
//   color: white;
//   font-size: 16px;
//   font-family: inherit;

//   &:hover {
//     background: rgb(26, 145, 218);
//   }
// `;

function CreateTweetReplyForm({
  loggedInUserId,
  tweet,
  onSubmit,
  placeholder = "Add another quack",
}) {
  const [value, setValue] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const tweetData = {
      author: loggedInUserId,
      content: value,
      parent: tweet._id,
    };

    onSubmit(tweetData);
    setValue("");
  };

  return (
    <TweetForm onSubmit={handleFormSubmit}>
      <TweetInputWrapper>
        <UserImg src={profile_src} alt="User Image" />
        <TweetInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type="text"
          placeholder={placeholder}
        />
      </TweetInputWrapper>
      <MediaInputWrapper>
        <MediaInnerWrapper>
          <input hidden type="file" />
          <MediaImg>{Icons.img}</MediaImg>
        </MediaInnerWrapper>
        <GenericBtn type="submit" disabled={!value}>
          Tweet
        </GenericBtn>
      </MediaInputWrapper>
    </TweetForm>
  );
}

const NewTweetReply = ({ tweet, closeNewReply, showSuccessToast }) => {
  // const { state } = useContext(AuthContext)
  const { user } = useAuth();
  const loggedInUserName = user.userName;
  const loggedInUserId = user.id;
  const [
    createReply,
    { status: replyStatus, error: replyError, data: replyData },
  ] = useCreateReply();

  useEffect(() => {
    if (replyStatus === "success") {
      if (closeNewReply) {
        closeNewReply();
      }

      console.log(loggedInUserName);
      showSuccessToast(
        "Your Tweet was sent",
        `/${loggedInUserName}/status/${replyData._id}`
      );

      // if (showSuccessToast) {
      //   console.log(messageData);
      //   showSuccessToast(messageData.conversationId);
      // } else {
      //   history.push(`/messages/${messageData.conversationId}`);
      // }
      // closeModal();
    }
  }, [replyStatus]);

  return (
    <TweetWrapper>
      <CreateTweetReplyForm
        loggedInUserId={loggedInUserId}
        tweet={tweet}
        onSubmit={createReply}
      />
    </TweetWrapper>
  );
};

export default NewTweetReply;
