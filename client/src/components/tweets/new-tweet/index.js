import React, { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../../../App";
import { GenericBtn } from "../../lib";
import { Colors } from "../../../styles/colors";
import Icons from "../../icons";
import styled from "styled-components";
import profile_src from "../../../images/profile.png";
import { useAsync } from "../../../hooks/useAsync";
import { useCreateTweet } from "../../../utils/tweets";
import useModal from "../../../hooks/useModal";
import Toast from "../../toast";
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
  font-size: 19px;
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

const MediaInnerWrapper = styled.label`
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

function CreateTweetForm({
  isModal,
  closeModal,
  onSubmit,
  placeholder = "What's happening?",
}) {
  const [value, setValue] = useState("");
  const { user } = useAuth();
  const { id } = user;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const tweetData = {
      author: id,
      content: value,
    };

    onSubmit(tweetData);
    setValue("");
    if (isModal) {
      closeModal();
    }
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

const NewTweet = ({ parent, isModal, closeNewTweet }) => {
  // const { state } = useContext(AuthContext);
  const [shouldToast, setShouldToast] = useState(false);
  // const { isLoading, isError, error, run, reset } = useAsync();
  const [
    createTweet,
    { status: tweetStatus, data: tweetData, error: tweetError },
  ] = useCreateTweet();

  // const [tweetValue, setTweetValue] = useState("");
  // const [tweetResponse, setTweetResponse] = useState(null);

  const [
    openToastModal,
    closeToastModal,
    isToastModalOpen,
    ToastModal,
  ] = useModal({
    background: "rgba(0, 0, 0, 0.5)",
    modalStyle: `
    position: fixed;
    left: 50%;
    bottom: 15px;
    transform: translate(-50%,-15px);
    z-index: 1000;`,
  });

  useEffect(() => {
    if (tweetStatus === "success") {
      closeNewTweet();
      setShouldToast(true);

      // if (showSuccessToast) {
      //   console.log(messageData);
      //   showSuccessToast(messageData.conversationId);
      // } else {
      //   history.push(`/messages/${messageData.conversationId}`);
      // }
      // closeModal();
    }
  }, [tweetStatus]);

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const tweetData = {
  //     author: `${user.id}`,
  //     content: `${tweetValue}`,
  //     parent: parent ? `${parent}` : null,
  //   };

  //   // if (isError) {
  //   //   reset();
  //   // } else {
  //   //   run(handleAddClick({ tweetData: tweetData }));
  //   // }

  //   // handleAddClick({ tweetData: tweetData });
  //   // if (isError) {
  //   //   reset();
  //   // } else {
  //   //   run();
  //   // }
  // }

  return (
    <>
      {shouldToast ?? (
        <ToastModal>
          <Toast
            message="Your Tweet was sent"
            link={`${tweetData.author.userName}/status/${tweetData._id}`}
          />
        </ToastModal>
      )}
      <TweetWrapper>
        <CreateTweetForm onSubmit={createTweet} />
      </TweetWrapper>
    </>
  );
};

export default NewTweet;
