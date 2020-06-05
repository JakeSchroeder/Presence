import React from "react";
import styled from "styled-components";
import { Colors } from "../styles/colors";
import { FollowBtn, GenericBtn } from "../components/lib";
import Icons from "../components/icons";
import Search from "../components/search";
import profile_src from "../images/profile.png";
import NewMessage from "../components/messages/new-message";
import useModal from "../hooks/useModal";

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
  padding: 20px;
  max-width: 600px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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

const TweetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
`;

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

// const NewTweet = () => {
//     return (
//         <>
//         <TweetWrapper>
//             <TweetInputWrapper>
//                 <UserImg src={profile_src} alt="User Image"/>
//                 <TweetInput type="text" placeholder="What's happening?"/>
//             </TweetInputWrapper>
//             <MediaInputWrapper>
//                 <MediaInnerWrapper>
//                 <MediaImg>{Icons.img}</MediaImg>
//     <MediaPolls>{Icons.polls}</MediaPolls>
//     </MediaInnerWrapper>
//                 <TweetSubmit>Tweet</TweetSubmit>
//             </MediaInputWrapper>
//         </TweetWrapper>
//         <Seperator/>
//         </>
//     );
// }

// const MessageModal = () => (
//   <MessageModalWrapper>
//     <MessageModalHeader>
//       <CloseBtn>{Icons.close}</CloseBtn>
//       <MessageTitle>Send Tweet</MessageTitle>
//     </MessageModalHeader>
//     <MessageContent>
//       <SearchWrapperModal>
//         <Search placeHolderText="Serch people" />
//       </SearchWrapperModal>
//     </MessageContent>
//     <MessageFooter>
//       <MessageComment type="text" placeholder="Add a comment" />
//       <MessageSend>{Icons.sendMessage}</MessageSend>
//     </MessageFooter>
//   </MessageModalWrapper>
// );

function Messages() {
  // const doc = document.getElementById("root");
  // const { isOpen, openModal, closeModal, Modal } = useModal({
  //   background: "rgba(0, 0, 0, 0.5)",
  //   closeOnOutsideClick: false,
  //   closeOnEsc: true,
  //   bindTo: doc,
  // });

  const { openModal, closeModal, isModalOpen, Modal } = useModal({
    background: "rgba(0, 0, 0, 0.5)",
    modalStyle: `
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 1000;
    `,
  });

  const messageExists = false;

  return (
    <>
      {isModalOpen && (
        <Modal>
          <NewMessage closeModal={closeModal} />
        </Modal>
      )}
      {/* <Wrapper> */}
      <Body>
        <HomeTitleWrapper>
          <HomeTitle>Messages</HomeTitle>
          <NewMessageIcon
            onClick={(e) => {
              openModal(e);
            }}
          >
            {Icons.newMessage}
          </NewMessageIcon>
        </HomeTitleWrapper>
        <SearchWrapper>
          <Search placeHolderText="Search for people and groups" />
        </SearchWrapper>
        <SendMessageWrapper>
          <NewMessageTitle>Send a message, get a message</NewMessageTitle>
          <NewMessageDesc>
            Direct Messages are private conversations between you and other
            people on Twitter. Share Tweets, media, and more!
          </NewMessageDesc>
          <NewMessageBtn
            onClick={(e) => {
              openModal(e);
            }}
          >
            Start a conversation
          </NewMessageBtn>
        </SendMessageWrapper>
      </Body>
      <SidebarWrapper>
        {messageExists ? (
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
              }}
            >
              New Message
            </NewMessageBtn>
          </NewMessageWrapper>
        )}
      </SidebarWrapper>
      {/* </Wrapper> */}
    </>
  );
}

export { Messages };
