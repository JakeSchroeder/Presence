import React, { useState, useContext } from "react";
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

const NewTweet = ({ parent }) => {
  // const { state } = useContext(AuthContext);
  const { user } = useAuth();
  const { id } = user;
  const { isLoading, isError, error, run, reset } = useAsync();
  const [handleAddClick] = useCreateTweet();
  const [tweetValue, setTweetValue] = useState("");
  const [tweetResponse, setTweetResponse] = useState(null);

  const { openModal, closeModal, isModalOpen, Modal } = useModal({
    background: "rgba(0, 0, 0, 0.5)",
    modalStyle: `
    position: fixed;
    left: 50%;
    bottom: 15px;
    transform: translate(-50%,-15px);
    z-index: 1000;`,
  });

  function handleSubmit(e) {
    e.preventDefault();

    const tweetData = {
      author: `${user.id}`,
      content: `${tweetValue}`,
      parent: parent ? `${parent}` : null,
    };

    if (isError) {
      reset();
    } else {
      run(handleAddClick({ tweetData: tweetData }));
    }

    // handleAddClick({ tweetData: tweetData });
    // if (isError) {
    //   reset();
    // } else {
    //   run();
    // }
  }

  return (
    <>
      {isModalOpen ? (
        <Modal>
          <Toast
            message="Your Tweet was sent"
            // link={`${state.user.userName}/status/${tweetResponse._id}`}
          />
        </Modal>
      ) : null}
      <TweetWrapper>
        <TweetForm
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <TweetInputWrapper>
            <UserImg src={profile_src} alt="User Image" />
            <TweetInput
              value={tweetValue}
              onChange={(e) => {
                setTweetValue(e.target.value);
              }}
              type="text"
              placeholder="What's happening?"
            />
          </TweetInputWrapper>
          <MediaInputWrapper>
            <MediaInnerWrapper>
              <MediaImg>{Icons.img}</MediaImg>
              <MediaPolls>{Icons.polls}</MediaPolls>
            </MediaInnerWrapper>
            <GenericBtn type="submit">Tweet</GenericBtn>
          </MediaInputWrapper>
        </TweetForm>
      </TweetWrapper>
    </>
  );
};

export default NewTweet;
