import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icons from "../icons";
import { Colors } from "../../styles/colors";
import useModal from "../../hooks/useModal";
import { useDropdown } from "../../hooks/useDropdown";
import SendMessage from "../messages/send-message";
import NewTweetReplyModal from "./reply-tweet/modal";
// import { useListItem } from "../../utils/=";

import profile_src from "../../images/profile.png";
// import {Dialog} from "@reach/dialog"l

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
  width: 100%;
  margin: 0 5px;
  padding-bottom: 10px;
`;

const NameWrapper = styled.div`
  justify-content: space-between;
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

  &.delete {
    & svg {
      fill: ${Colors.red};
    }
  }
`;

const ModalIconDesc = styled.span`
  display: block;
  white-space: nowrap;
  width: 100%;
  color: ${Colors.title};

  &.delete {
    color: ${Colors.red};
  }
`;

function TweetRow({ tweet }) {
  const history = useHistory();
  const { author, date, avatarPath, content, replies, likes } = tweet;
  const id = `tweet-row-tweet-${tweet._id}`;
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

  const [toggleDropdown, isDropdownOpen, Dropdown] = useDropdown({
    openLeft: true,
    openBottom: true,
  });

  const [
    toggleDeleteDropdown,
    isDeleteDropdownOpen,
    DeleteDropdown,
  ] = useDropdown({
    openDelete: true,
  });

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
        onClick={() => {
          history.push(`/${tweet.author.userName}/status/${tweet._id}`);
        }}
      >
        <TweetImgWrapper>
          <TweetImg src={profile_src} />
        </TweetImgWrapper>
        <TweetContent>
          <NameWrapper>
            <StyledLink
              to={{
                pathname: `/${author.userName}`,
                state: { userId: author._id },
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <DisplayName>{author.displayName}</DisplayName>

              <UserName>@{author.userName}</UserName>
            </StyledLink>
            {tweet.canDelete ? (
              <TweetActionItem
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDeleteDropdown(e);
                }}
              >
                <TweetAction>{Icons.dropDown}</TweetAction>
              </TweetActionItem>
            ) : null}
            {isDeleteDropdownOpen && (
              <DeleteDropdown>
                <ModalWrapper>
                  <ModalList>
                    <ModalItem
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDeleteDropdown(e);
                      }}
                    >
                      <ModalIcon className="delete">{Icons.delete}</ModalIcon>
                      <ModalIconDesc className="delete">Delete</ModalIconDesc>
                    </ModalItem>
                  </ModalList>
                </ModalWrapper>
              </DeleteDropdown>
            )}
          </NameWrapper>

          {/* <StyledLink
            to={`/${parent}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <UserName style={{ marginLeft: "0" }}>
              Replying to
              <span style={{ color: `${Colors.primary}` }}> @{parent}</span>
            </UserName>
          </StyledLink> */}

          <TweetDescription>{content}</TweetDescription>

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
                  // handleLike();
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
                    </ModalList>
                  </ModalWrapper>
                </Dropdown>
              )}
            </TweetActionWrapper>
            {/* {tweet.canDelete ? (
              <TweetActionWrapper>
                <TweetActionItem
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleLike();
                  }}
                >
                  <TweetAction>{Icons.close}</TweetAction>
                  delete
                </TweetActionItem>
              </TweetActionWrapper>
            ) : null} */}
          </TweetActions>
          {/* {tweet?.candDelete ? <p>can Delete</p> : null} */}
          {tweet.replies > 0 ? <ShowThread>Show this thread</ShowThread> : null}
        </TweetContent>
      </TweetWrapper>
    </>
  );
}

export { TweetRow };
