import React, { useState } from "react";
import styled from "styled-components";
import Icons from "../components/icons";
import Search from "../components/search";
import { Spinner } from "../components/lib";
import { Colors } from "../styles/colors";
import { useAuth } from "../context/authContext";
import {
  useMessagesByConversation,
  useCreateNewReply,
  useLeaveConversation,
} from "../utils/messages";
import profile_src from "../images/profile.png";
import { useParams, useHistory } from "react-router-dom";

import NewMessage from "../components/messages/new-message";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { ConversationList } from "../components/conversation-list";

const Body = styled.div`
  height: 100%;
  min-width: 375px;
  width: 100%;
  max-width: 600px;
  border-left: 1px solid ${Colors.border};
  border-right: 1px solid ${Colors.border};
`;

const SidebarWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: flex-start;
  justify-content: center; */
  border-right: 1px solid ${Colors.border};
`;

const SearchWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${Colors.border};
`;

const HomeTitleWrapper = styled.div`
  background: white;
  z-index: 10;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 53px;
  padding: 0 15px;
  border-bottom: 1px solid ${Colors.border};
`;

const NewMessageIcon = styled.div`
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
    width: 22.5px;
    fill: ${Colors.primary};
  }
`;

const HomeTitle = styled.h2``;

const HomeTitleInner = styled.div``;

const HomeTitleDisplayName = styled.h2``;
const HomeTitleUserName = styled.p``;

const StyledDialogOverlay = styled(DialogOverlay)`
  background: hsla(0, 0%, 0%, 0.33);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &.reply {
    align-items: flex-start;
    padding-top: 5%;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  &[data-reach-dialog-content] {
    padding: 0;
    width: auto;
    margin: 0;
    background: white;
    padding: 0;
    border-radius: 15px;
  }
`;

const SpinnerWrapper = styled.div`
  padding-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MessagesWrapper = styled.div`
  padding-top: 20px;
  /* height: 100%;
  max-height: 100%; */
`;

const MessagesList = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MessageItem = styled.li`
  padding-bottom: 20px;
`;

const ReplyForm = styled.form`
  width: 100%;
`;

const ReplyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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

const ReplyInput = styled.input`
  height: 32px;
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

const ReplyIcon = styled.div`
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

const SidebarFooter = styled.div`
  border-top: 1px solid ${Colors.border};
  height: 53px;
  padding: 10px;
`;

function NewReplyForm({ conversationId, onSubmit, placeholder }) {
  const [value, setValue] = useState("");
  const { user } = useAuth();
  const { id } = user;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const replyData = {
      userId: id,
      content: value,
      conversationId: conversationId,
    };

    onSubmit(replyData);
    setValue("");
  };

  return (
    <ReplyForm onSubmit={handleFormSubmit}>
      <ReplyWrapper>
        <ReplyInput
          id="newReply"
          placeholder="Start a new message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MessageSend type="submit">{Icons.sendMessage}</MessageSend>
      </ReplyWrapper>
    </ReplyForm>
  );
}

function MessageThread({ url }) {
  const { id: conversationId } = useParams();
  const history = useHistory();
  const {
    messages,
    status: messagesStatus,
    error: messagesError,
  } = useMessagesByConversation(conversationId);

  const [createNewReply, { data, status, error }] = useCreateNewReply();
  const [leaveConversation] = useLeaveConversation();

  const [isNewMessageOpen, setNewMessageOpen] = useState(false);
  const openNewMessage = () => setNewMessageOpen(true);
  const closeNewMessage = () => setNewMessageOpen(false);

  return (
    <>
      {isNewMessageOpen && (
        <StyledDialogOverlay>
          <StyledDialogContent>
            <NewMessage closeModal={closeNewMessage} />
          </StyledDialogContent>
        </StyledDialogOverlay>
      )}

      <Body>
        <HomeTitleWrapper>
          <HomeTitle>Messages</HomeTitle>
          <NewMessageIcon onClick={openNewMessage}>
            {Icons.newMessage}
          </NewMessageIcon>
        </HomeTitleWrapper>
        <SearchWrapper>
          <Search placeHolderText="Search for people and groups" />
        </SearchWrapper>
        <ConversationList url={url} />
      </Body>
      <SidebarWrapper>
        <HomeTitleWrapper>
          <HomeTitleInner>
            <HomeTitleDisplayName>Jake Schroeder</HomeTitleDisplayName>
            <HomeTitleUserName>@dwd</HomeTitleUserName>
          </HomeTitleInner>
          {/* add leave convo button */}
          <button
            onClick={() => {
              leaveConversation(conversationId);
              history.push("/messages");
            }}
          >
            Leave Convo
          </button>
        </HomeTitleWrapper>
        <MessagesWrapper>
          {messagesStatus === "loading" ? (
            <SpinnerWrapper>
              <Spinner width={25} height={25} />
            </SpinnerWrapper>
          ) : messagesStatus === "error" ? (
            "something happened"
          ) : messages.length > 0 ? (
            <MessagesList>
              {messages.map((message) => (
                <MessageItem key={message._id}>{message.content}</MessageItem>
              ))}
            </MessagesList>
          ) : (
            "nothing here"
          )}
        </MessagesWrapper>
        <SidebarFooter>
          <NewReplyForm
            onSubmit={createNewReply}
            conversationId={conversationId}
          />
        </SidebarFooter>
      </SidebarWrapper>

      {/* {messageExists ? (
          "Feed Here"
        ) : (
          <NewMessageWrapper>
            <NewMessageTitle>You don’t have a message selected</NewMessageTitle>
            <NewMessageDesc>
              Choose one from your existing messages, or start a new one.
            </NewMessageDesc>
            <NewMessageBtn
              onClick={(e) => {
                openModal(e);
              }}p
            >
              New Message
            </NewMessageBtn>
          </NewMessageWrapper>
        )} */}
    </>
  );
}

// <MainTitle>
// <GoBackBtn
//   onClick={() => {
//     history.goBack();
//   }}
// />
// <TitleText>Tweet</TitleText>
// </MainTitle>
// {status === "loading" ? (
// <SpinnerWrapper>
//   <Spinner width={25} height={25} />
// </SpinnerWrapper>
// ) : status === "error" ? (
// <p>{error.message}</p>
// ) : tweets.length > 0 ? (
// <>
//   <TweetThread tweet={tweets[0]} />
//   <TweetListUl>
//     {tweets.slice(1).map((tweet) => (
//       <li key={tweet._id}>
//         <TweetRow key={tweet._id} tweet={tweet} />
//       </li>
//     ))}
//   </TweetListUl>
// </>
// ) : (
// <ErrorWrapper>
//   <ExistText>Sorry, that page doesn’t exist!</ExistText>
//   <p>
//     Why not try a{" "}
//     <Link style={{ color: `${Colors.primary}` }} to="/explore">
//       search
//     </Link>{" "}
//     to find something else?
//   </p>
// </ErrorWrapper>
// )}

export { MessageThread };
