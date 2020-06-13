import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Icons from "../../icons";
import { Spinner } from "../../lib";
import { Colors } from "../../../styles/colors";
import Search from "../../search";
import profile_src from "../../../images/profile.png";
import { useAuth } from "../../../context/authContext";
import { useUserSearch } from "../../../utils/users";
import { useCreateMessage } from "../../../utils/messages";

const MessageModalWrapper = styled.div`
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  outline: none;
  min-height: 400px;
  border-radius: 15px;
  height: 650px;
  width: 100%;
  /* max-width: 80vw; */

  max-height: 90vh;
  background: white;
  min-width: 600px;
  max-width: 600px;
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
  padding: 10px;
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
  overflow-y: auto;
`;

const UserResults = styled.div``;

const MessageSend = styled.button`
  border: 0;
  background: none;
  outline: 0;
  cursor: pointer;
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

const SearchWrapperModal = styled.div``;

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

  /* &:focus > input {
    
    
  } */
  &:focus svg {
    background: black;
    fill: ${Colors.primary};
  }
`;

const SearchInput = styled.input`
  height: 38px;
  width: 100%;
  font-size: 15px;
  background: #e6ecf0;
  border: 1px solid transparent;
  padding: 10px 10px 10px 50px;
  outline: none;
  color: ${Colors.body};

  &:focus {
    color: ${Colors.title};
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

const TweetWrapper = styled.div`
  cursor: ${({ withReply }) => (withReply ? `default` : `pointer`)};
  position: relative;
  display: flex;

  padding: 10px 15px 0 15px;

  border-bottom: 1px solid ${Colors.border};

  ${({ withReply }) =>
    withReply
      ? null
      : `&:hover {
    background: ${Colors.light};
  }`}
`;

const TweetImgWrapper = styled.div`
  margin: 0 5px;
`;

const TweetImg = styled.img`
  border-radius: 50%;

  width: ${({ width }) => (width ? width : `39px`)};
  height: ${({ height }) => (height ? height : `39px`)};
`;

const TweetContent = styled.div`
  width: 100%;
  margin: 0 5px;
  padding-bottom: 10px;
`;

const NameWrapper = styled.div`
  height: 36px;

  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const NameInner = styled.div``;

const StyledCheckmark = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  /* &:hover {
    background: ${Colors.hover};

    & svg {
      fill: ${Colors.primary};
    }
  }
  */
  & svg {
    fill: ${Colors.primary};
    width: 18.75px;
    
  } 
`;

const DisplayName = styled.p`
  font-weight: bold;
  color: ${Colors.title};
`;

const UserName = styled.p`
  color: ${Colors.body};
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
  margin: 0 auto;
  max-width: 600px;
`;

const ExistText = styled.h1`
  font-size: 23px;
  margin-bottom: 20px;
`;

const UsersList = styled.ul``;

const AddedUserList = styled.ul`
  display: flex;
  padding: 5px 10px;
  background: #e6ecf0;
  flex-wrap: wrap;
  align-items: stretch;
  flex-basis: auto;
`;

const AddedUser = styled.li`
  cursor: pointer;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  min-height: 30px;
  padding-left: 3px;
  padding-right: 10px;
  border: 1px solid ${Colors.primary};
  border-radius: 999px;
  margin: 5px;
  background: white;

  &:hover {
    background: ${Colors.hover};
  }
`;

const AddedUserImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5px;
`;

const AddedUserName = styled.p`
  color: ${Colors.primary};
  padding-right: 5px;
`;

const RemoveAddedUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 18.75px;
  }
`;

const MessageForm = styled.form`
  width: 100%;
  display: flex;
`;

function CreateMessageForm({
  loggedInUser,
  tweet,
  members,
  onSubmit,
  placeholder = "Add a comment",
}) {
  const [value, setValue] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(tweet);
    console.log(members);

    console.log(loggedInUser.id);

    const messageData = {
      userId: loggedInUser.id,
      content: value,
      members: [loggedInUser.id, ...members],
      tweet: tweet ? tweet._id : null,
    };

    onSubmit(messageData);
    setValue("");
  };

  return (
    <MessageForm onSubmit={handleFormSubmit}>
      <MessageComment
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Add a comment"
      />
      <MessageSend type="submit">{Icons.sendMessage}</MessageSend>
    </MessageForm>
  );
}

function SendMessage({ closeModal, tweet, showSuccessToast }) {
  const history = useHistory();
  const { user: loggedInUser } = useAuth();
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState();
  const [userIsSelected, setUserIsSelected] = useState(false);

  const { users, error, status, isFetching } = useUserSearch(query);
  // const { data, error, status, isFetching} = useNewMessage();

  const [
    createMessage,
    { status: messageStatus, error: messageError, data: messageData },
  ] = useCreateMessage();

  const [addedUsers, setAddedUsers] = useState([]);

  function addUser(newUser) {
    setAddedUsers((old) => [
      ...old.filter((user) => user !== newUser),
      newUser,
    ]);
  }

  function removeAddedUser(addedUser) {
    setAddedUsers((old) => old.filter((item) => item !== addedUser));
  }

  function handleSearchClick(event) {
    event.preventDefault();
    setHasSearched(true);
    setQuery(event.target.elements.searchUser.value);
  }

  useEffect(() => {
    if (messageStatus === "success") {
      if (showSuccessToast) {
        console.log(messageData);
        showSuccessToast(messageData.conversationId);
      } else {
        history.push(`/messages/${messageData.conversationId}`);
      }
      closeModal();
    }
  }, [messageStatus]);

  // useEffect(() => {
  //   console.log(query);
  // }, [query]);

  return (
    <MessageModalWrapper>
      <MessageModalHeader>
        <TitleWrapper>
          <CloseBtn onClick={closeModal}>{Icons.close}</CloseBtn>
          <MessageTitle>Send Message</MessageTitle>
        </TitleWrapper>
      </MessageModalHeader>
      <MessageContent>
        <SearchWrapperModal>
          <SearchForm onSubmit={handleSearchClick}>
            <SearchWrapper>
              <SearchIcon>{Icons.search}</SearchIcon>
              <SearchInput
                id="searchUser"
                type="text"
                placeholder="Search people"
              />
            </SearchWrapper>
          </SearchForm>
          {addedUsers.length > 0 ? (
            <AddedUserList>
              {addedUsers.map((user) => (
                <AddedUser
                  onClick={() => {
                    removeAddedUser(user);
                  }}
                >
                  <AddedUserImg>
                    <TweetImg width={24} height={24} src={profile_src} />
                  </AddedUserImg>
                  <AddedUserName>{user.displayName}</AddedUserName>
                  <RemoveAddedUser>{Icons.close}</RemoveAddedUser>
                </AddedUser>
              ))}
            </AddedUserList>
          ) : null}
        </SearchWrapperModal>
        <UserResults>
          {status === "loading" ? (
            <SpinnerWrapper>
              <Spinner width={25} height={25} />
            </SpinnerWrapper>
          ) : status === "error" ? (
            <p>Error: {error.message}</p>
          ) : users.length ? (
            <UsersList>
              {users.map((user) => {
                if (user._id !== loggedInUser.id) {
                  // console.log(loggedInUser);
                  return (
                    <li key={user._id}>
                      <TweetWrapper
                        key={user._id}
                        onClick={() => {
                          addUser(user);
                        }}
                      >
                        <TweetImgWrapper>
                          <TweetImg src={profile_src} />
                        </TweetImgWrapper>
                        <TweetContent>
                          <NameWrapper>
                            <NameInner>
                              <DisplayName>{user.displayName}</DisplayName>
                              {/* {author.displayName} */}
                              <UserName>@{user.userName}</UserName>
                            </NameInner>
                            {/* @{author.userName} */}

                            {userIsSelected ? (
                              <StyledCheckmark>
                                {Icons.checkmark}
                              </StyledCheckmark>
                            ) : null}
                          </NameWrapper>
                        </TweetContent>
                      </TweetWrapper>
                    </li>
                  );
                } else {
                  return (
                    <ErrorWrapper>
                      <ExistText>No results for "{query}"</ExistText>
                      <p>
                        The term you entered did not bring up any results. You
                        may have mistyped your term, try researching.
                      </p>
                    </ErrorWrapper>
                  );
                }
              })}
            </UsersList>
          ) : hasSearched ? (
            <ErrorWrapper>
              <ExistText>No results for "{query}"</ExistText>
              <p>
                The term you entered did not bring up any results. You may have
                mistyped your term, try researching.
              </p>
            </ErrorWrapper>
          ) : null}
        </UserResults>
      </MessageContent>
      <MessageFooter>
        <CreateMessageForm
          tweet={tweet}
          members={addedUsers}
          onSubmit={createMessage}
          placeholder="Add a comment"
          loggedInUser={loggedInUser}
        />
      </MessageFooter>
    </MessageModalWrapper>
  );
}

export default SendMessage;
