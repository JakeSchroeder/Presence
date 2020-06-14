import React, { useState } from "react";
import styled from "styled-components";
import { useRouteMatch, Switch, Route, useHistory } from "react-router-dom";
import { Colors } from "../styles/colors";
import { FollowBtn, GenericBtn, Spinner } from "../components/lib";
import Icons from "../components/icons";
import Search from "../components/search";
import profile_src from "../images/profile.png";
import SendMessage from "../components/messages/send-message";
import useModal from "../hooks/useModal";
import { useConversationsByUser } from "../utils/messages";
import { useAuth } from "../context/authContext";
// import { ConversationList } from "../components/conversation-list";
import { MessageThread } from "../components/message-thread";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { ConversationList } from "../components/conversation-list";

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
  align-items: center;
  justify-content: center;
  border-right: 1px solid ${Colors.border};

  @media (max-width: 1021px) {
    display: none;
  }
`;

const SidebarFooter = styled.p`
  margin-top: 15px;
`;

const SearchWrapper = styled.div`
  padding: 10px;
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

const HomeTitleWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
`;

const HomeTitleInner = styled.div`
  height: 53px;
  padding: 0 15px;
  border-bottom: 1px solid ${Colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HomeTitle = styled.h2``;

// const TweetWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 20px 15px;
// `;

const TweetInputWrapper = styled.div`
  display: flex;
`;

const UserImg = styled.img`
  border-radius: 50%;
`;

const TweetInput = styled.input`
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
    background: rgba(29, 161, 242, 0.1);
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
    background: rgba(29, 161, 242, 0.1);
  }

  & svg {
    width: 100%;
    fill: ${Colors.primary};
  }
`;

const TweetSubmit = styled.button`
  min-height: 40px;
  cursor: pointer;

  border-radius: 999px;
  padding: 0 20px;
  border: 0;
  outline: 0;
  background: ${Colors.primary};
  color: white;
  font-size: 16px;
  font-family: inherit;

  &:hover {
    background: rgb(26, 145, 218);
  }
`;

const Seperator = styled.div`
  height: 10px;
  background: ${Colors.border};
  width: 100%;
`;

const NewMessageBtn = styled(GenericBtn)`
  margin-top: 20px;
`;

const NewMessageWrapper = styled.div`
  text-align: center;
`;

const SendMessageWrapper = styled(NewMessageWrapper)`
  padding: 40px 20px;
`;

const NewMessageTitle = styled.h2`
  margin-bottom: 10px;
`;

const NewMessageDesc = styled.p``;

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

const TweetWrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid ${Colors.border};

  &:hover {
    background: ${Colors.light};
  }
`;

const TweetImgWrapper = styled.div`
  margin: 0 5px;
`;

const TweetImg = styled.img`
  border-radius: 50%;
`;

const TweetContent = styled.div`
  width: 100%;
  margin: 0 5px;
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const DisplayName = styled.p`
  font-weight: bold;
  color: ${Colors.title};

  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }
`;

const UserName = styled.p`
  color: ${Colors.body};
  margin-left: 5px;
`;

const LatestMessage = styled.p``;

const SpinnerWrapper = styled.div`
  padding-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledConversationList = styled.ul``;

function Messages() {
  let history = useHistory();
  let { path, url } = useRouteMatch();

  const { user } = useAuth();

  const [isNewMessageOpen, setNewMessageOpen] = useState(false);
  const openNewMessage = () => setNewMessageOpen(true);
  const closeNewMessage = () => setNewMessageOpen(false);

  return (
    <>
      <Switch>
        <Route exact path={path}>
          {isNewMessageOpen && (
            <StyledDialogOverlay>
              <StyledDialogContent>
                <SendMessage closeModal={closeNewMessage} />
              </StyledDialogContent>
            </StyledDialogOverlay>
          )}

          <Body>
            <HomeTitleWrapper>
              <HomeTitleInner>
                <HomeTitle>Messages</HomeTitle>
                <NewMessageIcon onClick={openNewMessage}>
                  {Icons.newMessage}
                </NewMessageIcon>
              </HomeTitleInner>
            </HomeTitleWrapper>
            <BodyInner>
              <BodyPositioner>
                <ConversationWrapper>
                  <SearchWrapper>
                    <Search placeHolderText="Search for people and groups" />
                  </SearchWrapper>
                  <ConversationList url={url} />
                </ConversationWrapper>
              </BodyPositioner>
            </BodyInner>
          </Body>
          <SidebarWrapper>
            <NewMessageWrapper>
              <NewMessageTitle>
                You don’t have a message selected
              </NewMessageTitle>
              <NewMessageDesc>
                Choose one from your existing messages, or start a new one.
              </NewMessageDesc>
              <NewMessageBtn
                onClick={(e) => {
                  openNewMessage();
                }}
              >
                New Message
              </NewMessageBtn>
            </NewMessageWrapper>
          </SidebarWrapper>
        </Route>
        <Route path={`${path}/:id`}>
          <MessageThread url={url} />
        </Route>
      </Switch>
    </>
  );
}

export { Messages };
