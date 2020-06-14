import React, { useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import Icons from "../components/icons";
import Search from "../components/search";
import { Spinner, GoBackBtn } from "../components/lib";
import { Colors } from "../styles/colors";
import { useAuth } from "../context/authContext";
import {
  useMessagesByConversation,
  useCreateNewReply,
  useLeaveConversation,
} from "../utils/messages";
import profile_src from "../images/profile.png";
import { useParams, useHistory, Link } from "react-router-dom";

import NewMessage from "../components/messages/new-message";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { ConversationList } from "../components/conversation-list";
import SendMessage from "./messages/send-message";

const Body = styled.div`
  height: 100%;
  min-width: 375px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  border-left: 1px solid ${Colors.border};
  border-right: 1px solid ${Colors.border};
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 1021px) {
    display: none;
  }
`;

const BodyInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BodyPositioner = styled.div`
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ConversationWrapper = styled.div`
  max-width: 600px;
  display: flex;
  flex-grow: 1;
  width: 100%;
  flex-direction: column;
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
  @media (max-width: 1021px) {
    border-left: 1px solid ${Colors.border};
  }

  border-right: 1px solid ${Colors.border};
`;

const SidebarInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SidebarPositioner = styled.div`
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  /* height: 100%;
  max-height: 100%; */
  height: 100%;
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-grow: 1;
  width: 100%;
  flex-direction: column;
`;

const SidebarFooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const SidebarFooterInner = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const MessagesInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  max-height: 100%;
  height: 100%;
`;

const MessagesListWrapper = styled.div`
  padding-top: 20px;
  overflow-x: hidden;
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-grow: 1;
  transform: translate3d(0px, 0px, 0px);
`;

const MessagesList = styled.div`
  max-width: 600px;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 15px;
`;

const MessageItem = styled.div`
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
  /* position: sticky;
  bottom: 0; */
`;

const MessageTweet = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledGoBackBtn = styled.div`
  @media (min-width: 1021px) {
    display: none;
  }
`;

const BubbleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ right }) => (right ? `flex-end` : `flex-start`)};
`;

const Bubble = styled.div`
  background: ${Colors.primary};
  padding: 10px 15px;
  border-top-left-radius: 99px;
  border-top-right-radius: 99px;
  border-bottom-left-radius: ${({ right }) => (right ? `99px` : `0px`)};
  border-bottom-right-radius: ${({ right }) => (right ? `0px` : `99px`)};
`;

const BubbleContent = styled.p`
  color: white;
`;

const BubbleTimeStamp = styled.p``;

const BubbleOuter = styled.div`
  display: flex;
`;

const ProfileImg = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  margin-right: 10px;
`;

function UserMessage({ content, timeStamp }) {
  return (
    <BubbleWrapper right>
      <Bubble right>
        <BubbleContent>{content}</BubbleContent>
      </Bubble>
      <BubbleTimeStamp>
        {" "}
        <Moment format="dddd h:mm A">{timeStamp}</Moment>
      </BubbleTimeStamp>
    </BubbleWrapper>
  );
}

function OtherMessage({ content, timeStamp, userImg }) {
  return (
    <BubbleOuter>
      <ProfileImg src={profile_src} />
      <BubbleWrapper>
        <Bubble>
          <BubbleContent>{content}</BubbleContent>
        </Bubble>
        <BubbleTimeStamp>
          <Moment format="dddd h:mm A">{timeStamp}</Moment>
        </BubbleTimeStamp>
      </BubbleWrapper>
    </BubbleOuter>
  );
}

// function TweetMessage({content, timeStamp, userImg, tweet}) {
//   return (
//     <BubbleOuter>
//       <ProfileImg src={profile_src} />
//       <BubbleWrapper>
//         <Bubble>
//           <BubbleContent>{content}</BubbleContent>
//         </Bubble>
//         <BubbleTimeStamp>
//           <Moment format="dddd HH:mm">{timeStamp}</Moment>
//         </BubbleTimeStamp>
//       </BubbleWrapper>
//     </BubbleOuter>
//   );
// }

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
  const { user } = useAuth();
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
            <SendMessage closeModal={closeNewMessage} />
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
        <BodyInner>
          <BodyPositioner>
            <SearchWrapper>
              <Search placeHolderText="Search for people and groups" />
            </SearchWrapper>
            <ConversationList url={url} currentConvo={conversationId} />
          </BodyPositioner>
        </BodyInner>
      </Body>
      <SidebarWrapper>
        <HomeTitleWrapper>
          <ButtonWrapper>
            <StyledGoBackBtn>
              <GoBackBtn
                onClick={() => {
                  history.push("/messages");
                }}
              />
            </StyledGoBackBtn>
            <HomeTitleInner>
              <HomeTitleDisplayName>Jake Schroeder</HomeTitleDisplayName>
              <HomeTitleUserName>@dwd</HomeTitleUserName>
            </HomeTitleInner>
          </ButtonWrapper>
          {/* add leave convo button */}
          <p
            style={{ color: Colors.primary, cursor: "pointer" }}
            onClick={() => {
              leaveConversation(conversationId);
              history.push("/messages");
            }}
          >
            Leave
          </p>
        </HomeTitleWrapper>
        <SidebarInner>
          <SidebarPositioner>
            <MessagesWrapper>
              <SidebarFooterWrapper>
                <SidebarFooterInner>
                  <MessagesInner>
                    <MessagesListWrapper>
                      {messagesStatus === "loading" ? (
                        <SpinnerWrapper>
                          <Spinner width={25} height={25} />
                        </SpinnerWrapper>
                      ) : messagesStatus === "error" ? (
                        "something happened"
                      ) : messages.length > 0 ? (
                        <MessagesList>
                          {messages.map((message) => (
                            <MessageItem>
                              {message.author._id == user.id ? (
                                <UserMessage
                                  content={message.content}
                                  timeStamp={message.createdAt}
                                />
                              ) : (
                                <OtherMessage
                                  content={message.content}
                                  timeStamp={message.createdAt}
                                />
                              )}
                            </MessageItem>
                          ))}
                        </MessagesList>
                      ) : (
                        "nothing here"
                      )}
                    </MessagesListWrapper>
                  </MessagesInner>
                  <SidebarFooter>
                    <NewReplyForm
                      onSubmit={createNewReply}
                      conversationId={conversationId}
                    />
                  </SidebarFooter>
                </SidebarFooterInner>
              </SidebarFooterWrapper>
            </MessagesWrapper>
          </SidebarPositioner>
        </SidebarInner>
      </SidebarWrapper>
    </>
  );
}

export { MessageThread };
