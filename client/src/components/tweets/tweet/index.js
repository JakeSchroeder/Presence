import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../../styles/colors";
import profile_src from "../../../images/profile.png";
import Search from "../../search";
import Icons from "../../icons";
import useModal from "../../../hooks/useModal";
import { useDropdown } from "../../../hooks/useDropdown";
import SendMessage from "../../messages/send-message";
// import RelpyTweetModal from "../reply-tweet";
import NewTweetReplyModal from "../reply-tweet/modal";
import axios from "axios";

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

// const LinkWrapper = styled(Link)`
//   &:hover {
//     background: ${Colors.light};
//   }
//   display: block;
//   /* position: absolute;
//   top: 0;
//   left: 0;
//   z-index: -1; */
//   width: 100%;
//   height: 100%;
// `;

const TweetImgWrapper = styled.div`
  margin: 0 5px;
  ${({ withReply }) =>
    withReply
      ? `
  position: relative;
    &:before {
      content: "";
      width: 2px;
      height: 100%;
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

const StyledLink = styled(Link)`
  display: flex;
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

const TweetActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TweetActionWrapper = styled.div`
  position: relative;
  width: calc(100% / 3);
`;

const TweetActionItem = styled.div`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: 13px;

  &:hover {
    color: ${Colors.primary};
    & div {
      background: ${Colors.hover};
    }
    & svg {
      fill: ${Colors.primary};
    }
  }

  &.like:hover {
    color: ${Colors.red};
    & div {
      background: ${Colors.redHover};
    }
    & svg {
      fill: ${Colors.red};
    }
  }
`;

const TweetAction = styled.div`
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
    fill: ${Colors.body};
    width: 18.75px;
  } 
`;

const ShowThread = styled.p`
  color: ${Colors.primary};
`;

const ModalWrapper = styled.div`
  border-radius: 5px;
  background: white;

  box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px,
    rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
`;

const ModalBG = styled.div`
  z-index: 990;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: none;
  cursor: default;
`;

const ModalList = styled.ul``;

const ModalItem = styled.li`
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  &:hover {
    background: rgb(245, 248, 250);
  }
`;

const ModalIcon = styled.div`
  margin-right: 10px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & svg {
    fill: rgb(101, 119, 134);
    width: 1.25rem;
  }
`;

const ModalIconDesc = styled.span`
  display: block;
  white-space: nowrap;
  width: 100%;

  color: ${Colors.title};
`;

// const ModalBG = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.1);
// `;

const MessageModalWrapper = styled.div`
  border-radius: 15px;
  position: relative;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  min-height: 400px;

  height: 650px;

  max-width: 80vw;

  max-height: 90vh;
  background: white;
  min-width: 600px;
`;

const MessageModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
  padding: 10px 10px 10px 50px;
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
`;

const MessageSend = styled.div`
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

const SearchWrapper = styled.div`
  padding: 15px;
`;

const CloseBtn = styled.div`
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

export const Tweet = ({ tweet, noToolbar, replying, parent }) => {
  const history = useHistory();
  console.log(tweet);
  const [openModal, closeModal, isModalOpen, Modal] = useModal({
    background: "rgba(0, 0, 0, 0.5)",
    modalStyle: `
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 1000;
    `,
  });

  const [
    openReplyModal,
    closeReplyModal,
    isReplyModalOpen,
    ReplyModal,
  ] = useModal({
    background: "rgba(0, 0, 0, 0.5)",
    modalStyle: `
      position: fixed;
      left: 50%;
      top: 5%;
      transform: translate(-50%,-5%);
      z-index: 1000;
    `,
  });

  const { toggleDropdown, isDropdownOpen, Dropdown } = useDropdown({
    openLeft: true,
    openBottom: true,
  });

  const handleHistoryPush = () => {
    history.push(`/${tweet.author.userName}/status/${tweet._id}`);
  };

  const handleLike = () => {
    // axios.post(`/api/tweet/${tweet._id}/like`).then((res) => {
    //   console.log(res);
    // });
    console.log("like");
  };

  return (
    <>
      {isModalOpen && (
        <Modal>
          <SendMessage closeModal={closeModal} />
        </Modal>
      )}
      {isReplyModalOpen && (
        <ReplyModal>
          <NewTweetReplyModal tweet={tweet} closeModal={closeReplyModal} />
        </ReplyModal>
      )}
      <TweetWrapper
        withReply={replying}
        {...(!replying && { onClick: handleHistoryPush })}
      >
        <TweetImgWrapper>
          <TweetImg src={profile_src} />
        </TweetImgWrapper>
        <TweetContent>
          <NameWrapper>
            <StyledLink
              to={{
                pathname: `/${tweet.author.userName}`,
                state: { userId: tweet.author._id },
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <DisplayName>{tweet.author.displayName}</DisplayName>

              <UserName>@{tweet.author.userName}</UserName>
            </StyledLink>
          </NameWrapper>
          {parent ? (
            <StyledLink
              to={`/${parent}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <UserName style={{ marginLeft: "0" }}>
                Replying to
                <span style={{ color: `${Colors.primary}` }}> @{parent}</span>
              </UserName>
            </StyledLink>
          ) : null}
          <TweetDescription>{tweet.content}</TweetDescription>
          {noToolbar ? null : (
            <TweetActions>
              <TweetActionWrapper>
                <TweetActionItem
                  className="reply"
                  onClick={(e) => {
                    e.stopPropagation();
                    openReplyModal(e);
                  }}
                >
                  <TweetAction>{Icons.reply}</TweetAction>
                  {tweet.replies}
                </TweetActionItem>
              </TweetActionWrapper>
              <TweetActionWrapper>
                <TweetActionItem
                  className="like"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                >
                  <TweetAction>{Icons.heart}</TweetAction>
                  {tweet.likes}
                </TweetActionItem>
              </TweetActionWrapper>
              <TweetActionWrapper>
                <TweetActionItem
                  className="share"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(e);
                  }}
                >
                  <TweetAction>{Icons.share}</TweetAction>
                </TweetActionItem>
                {isDropdownOpen && (
                  <Dropdown>
                    <ModalWrapper>
                      <ModalList>
                        <ModalItem
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown();
                            openModal(e);
                          }}
                        >
                          <ModalIcon>{Icons.modalMessage}</ModalIcon>
                          <ModalIconDesc>Send via Direct Message</ModalIconDesc>
                        </ModalItem>
                        {/* <ModalItem
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <ModalIcon>{Icons.edit}</ModalIcon>
                        <ModalIconDesc>Edit Tweet</ModalIconDesc>
                      </ModalItem> */}
                      </ModalList>
                    </ModalWrapper>
                  </Dropdown>
                )}
              </TweetActionWrapper>
            </TweetActions>
          )}

          {tweet.replies > 0 ? <ShowThread>Show this thread</ShowThread> : null}
        </TweetContent>
      </TweetWrapper>
    </>
  );
};

const LargeDesc = styled.p`
  font-size: 23px;
  color: ${Colors.title};
  margin-top: 15px;
  margin-bottom: 15px;
`;

const LargeTweetAction = styled(TweetAction)`
  & svg {
    width: 22.5px;
  }
`;

const NumLikes = styled.div`
  display: flex;
  border-top: 1px solid ${Colors.border};
  padding: 10px 0;
`;

const LikeCount = styled.span`
  color: ${Colors.title};
  font-weight: bold;
  display: block;
  margin-right: 5px;
`;

export const TweetThread = ({ tweet }) => {
  // const [isModalOpen, setModalOpen] = useState(false);
  // const toggleModal = (e) => {
  //   e.preventDefault();
  //   setModalOpen(!isModalOpen);

  // };

  const [openModal, closeModal, isModalOpen, Modal] = useModal({
    background: "rgba(0, 0, 0, 0.5)",
    modalStyle: `
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 1000;
    `,
  });

  const [
    openReplyModal,
    closeReplyModal,
    isReplyModalOpen,
    ReplyModal,
  ] = useModal({
    background: "rgba(0, 0, 0, 0.5)",
    modalStyle: `
      position: fixed;
      left: 50%;
      top: 5%;
      transform: translate(-50%,-5%);
      z-index: 1000;
    `,
  });

  const { toggleDropdown, isDropdownOpen, Dropdown } = useDropdown({
    openLeft: true,
    openBottom: true,
  });

  const handleLike = () => {
    axios.post(`/api/tweet/${tweet._id}/like`).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      {isModalOpen && (
        <Modal>
          <SendMessage closeModal={closeModal} />
        </Modal>
      )}
      {isReplyModalOpen && (
        <ReplyModal>
          <NewTweetReplyModal tweet={tweet} closeModal={closeReplyModal} />
        </ReplyModal>
      )}
      <TweetWrapper>
        <TweetImgWrapper>
          <TweetImg src={profile_src} />
        </TweetImgWrapper>
        <TweetContent>
          <NameWrapper>
            <StyledLink
              to={`/${tweet.author.userName}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <DisplayName>{tweet.author.displayName}</DisplayName>

              <UserName>@{tweet.author.userName}</UserName>
            </StyledLink>
          </NameWrapper>
          <LargeDesc>{tweet.content}</LargeDesc>
          <NumLikes>
            <LikeCount>{tweet.likes}</LikeCount> Likes
          </NumLikes>
          <TweetActions
            style={{
              borderTop: `1px solid ${Colors.border}`,
              paddingTop: "10px",
            }}
          >
            <TweetActionWrapper>
              <TweetActionItem
                className="reply"
                onClick={(e) => {
                  e.stopPropagation();
                  openReplyModal(e);
                }}
              >
                <LargeTweetAction>{Icons.reply}</LargeTweetAction>
                {tweet.replies}
              </TweetActionItem>
            </TweetActionWrapper>
            <TweetActionWrapper>
              <TweetActionItem
                className="like"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
              >
                <LargeTweetAction>{Icons.heart}</LargeTweetAction>
                {tweet.likes}
              </TweetActionItem>
            </TweetActionWrapper>
            <TweetActionWrapper>
              <TweetActionItem
                className="share"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(e);
                }}
              >
                <LargeTweetAction>{Icons.share}</LargeTweetAction>
              </TweetActionItem>
              {isDropdownOpen && (
                <Dropdown>
                  <ModalWrapper>
                    <ModalList>
                      <ModalItem
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown();
                          openModal(e);
                        }}
                      >
                        <ModalIcon>{Icons.modalMessage}</ModalIcon>
                        <ModalIconDesc>Send via Direct Message</ModalIconDesc>
                      </ModalItem>
                      {/* <ModalItem
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <ModalIcon>{Icons.edit}</ModalIcon>
                        <ModalIconDesc>Edit Tweet</ModalIconDesc>
                      </ModalItem> */}
                    </ModalList>
                  </ModalWrapper>
                </Dropdown>
              )}
              {/* {isModalOpen ? <ActionModal toggleModal={toggleModal} /> : null} */}
            </TweetActionWrapper>
          </TweetActions>
        </TweetContent>
      </TweetWrapper>
    </>
  );
};
