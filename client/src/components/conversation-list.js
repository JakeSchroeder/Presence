import React from "react";
import styled from "styled-components";
import { Spinner, GenericBtn } from "../components/lib";
import Icons from "../components/icons";
import Search from "../components/search";
import { Colors } from "../styles/colors";
import { useAuth } from "../context/authContext";
import { useModal } from "../hooks/useModal";
// import NewMessage from "../components/messages/new-message";
import SendMessage from "../components/messages/send-message";
import { useConversationsByUser } from "../utils/messages";
import profile_src from "../images/profile.png";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`;

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
  /* align-items: flex-start;
  justify-content: center; */
  border-right: 1px solid ${Colors.border};
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

//change name to something more page

export const ConversationList = ({ url }) => {
  const history = useHistory();

  const { user } = useAuth();

  const {
    conversations,
    status: convoStatus,
    error: convoError,
    isFetching: convoIsFetching,
  } = useConversationsByUser();

  return (
    <>
      {convoStatus === "loading" ? (
        <SpinnerWrapper>
          <Spinner width={25} height={25} />
        </SpinnerWrapper>
      ) : convoStatus === "error" ? (
        "something happened"
      ) : conversations.length > 0 ? (
        <StyledConversationList>
          {conversations.map((convo) => (
            <li key={convo._id}>
              <TweetWrapper
                onClick={() => {
                  history.push(`${url}/${convo._id}`);
                }}
              >
                <TweetImgWrapper>
                  <TweetImg src={profile_src} />
                </TweetImgWrapper>
                <TweetContent>
                  <NameWrapper>
                    {convo.members.map((member) => {
                      // if (member._id == user.id) {
                      //   return <DisplayName>You</DisplayName>;
                      // }
                      return (
                        <DisplayName key={member._id}>
                          {member.displayName}
                        </DisplayName>
                      );
                    })}
                  </NameWrapper>
                  <LatestMessage>Message here</LatestMessage>
                </TweetContent>
              </TweetWrapper>
            </li>
          ))}
        </StyledConversationList>
      ) : (
        <NewMessageWrapper>
          <NewMessageTitle>You don’t have a message selected</NewMessageTitle>
          <NewMessageDesc>
            Choose one from your existing messages, or start a new one.
          </NewMessageDesc>
        </NewMessageWrapper>
      )}
    </>
  );
};
