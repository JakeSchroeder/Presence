import React, { forwardRef, useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icons from "../icons";
import { Colors } from "../../styles/colors";
import useModal from "../../hooks/useModal";
import { useDropdown } from "../../hooks/useDropdown";
import SendMessage from "../messages/send-message";
import NewTweetReplyModal from "./reply-tweet/modal";
import Toast from "../toast";
// import { useListItem } from "../../utils/=";
import {
  useRemoveTweet,
  useTweetLike,
  useTweetUnLike,
} from "../../utils/tweets";
import profile_src from "../../images/profile.png";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink,
  useMenuButtonContext,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

import { positionRight, getCollisions } from "@reach/popover";

// import { Dialog } from "@reach/dialog";

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
  height: 36px;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;

  &:hover > p:first-child {
    text-decoration: underline;
  }
  overflow-wrap: break-word;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > p {
    overflow-wrap: break-word;
  }
`;

const DisplayName = styled.p`
  font-weight: bold;
  color: ${Colors.title};
`;

const UserName = styled.p`
  color: ${Colors.body};
  margin-left: 5px;
  margin-right: 10px;
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

  &.hasLiked svg {
      fill: ${Colors.red};
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

const StyledMenuButton = styled(MenuButton)`
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  outline: 0;
  &:focus {
    outline: 0;
  }
`;

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

const TweetDate = styled.p``;

// const TweetActionItem = forwardRef((props, ref) => (
//   <StyledTweetActionItem
//     className={props.className}
//     ref={ref}
//     onClick={props.onClick}
//   >
//     {props.children}
//   </StyledTweetActionItem>
// ));

function TweetRow({ tweet }) {
  const history = useHistory();
  const { author, date, avatarPath, content, replies, likes } = tweet;

  const [removeTweet] = useRemoveTweet();
  const [likeTweet] = useTweetLike();
  const [unlikeTweet] = useTweetUnLike();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [isNewMessageOpen, setNewMessageOpen] = useState(false);
  const openNewMessage = () => setNewMessageOpen(true);
  const closeNewMessage = () => setNewMessageOpen(false);

  const [isNewReplyOpen, setNewReplyOpen] = useState(false);
  const openNewReply = () => setNewReplyOpen(true);
  const closeNewReply = () => setNewReplyOpen(false);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastLink, setToastLink] = useState();

  const showSuccessToast = (conversationId) => {
    setToastLink(conversationId);
    setIsToastOpen(true);
  };

  return (
    <>
      {isToastOpen && (
        <Toast
          message="Your message was sent"
          link={`/messages/${toastLink}`}
        />
      )}
      {isNewMessageOpen && (
        <StyledDialogOverlay onDismiss={closeNewMessage}>
          <StyledDialogContent>
            <SendMessage
              tweet={tweet}
              closeModal={closeNewMessage}
              showSuccessToast={showSuccessToast}
            />
          </StyledDialogContent>
        </StyledDialogOverlay>
      )}
      {isNewReplyOpen && (
        <StyledDialogOverlay className="reply" onDismiss={closeNewReply}>
          <StyledDialogContent>
            <NewTweetReplyModal tweet={tweet} closeModal={closeNewReply} />
          </StyledDialogContent>
        </StyledDialogOverlay>
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
              <TweetDate>
                <Moment format="MMM D">{tweet.createdAt}</Moment>
              </TweetDate>
            </StyledLink>

            {tweet.canDelete ? (
              <Menu>
                <StyledMenuButton
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <TweetActionItem>
                    <TweetAction>{Icons.dropDown}</TweetAction>
                  </TweetActionItem>
                </StyledMenuButton>
                <MenuPopover
                  position={(targetRect, popoverRect) => {
                    function getTopPosition(targetRect, popoverRect) {
                      const { directionUp } = getCollisions(
                        targetRect,
                        popoverRect
                      );
                      return {
                        top: directionUp
                          ? `${targetRect.top + window.pageYOffset}px`
                          : `${
                              targetRect.top +
                              // targetRect.height +
                              window.pageYOffset
                            }px`,
                      };
                    }
                    if (!targetRect || !popoverRect) {
                      return {};
                    }

                    const { directionLeft } = getCollisions(
                      targetRect,
                      popoverRect
                    );
                    return {
                      left: directionLeft
                        ? `${targetRect.left + window.pageXOffset}px`
                        : `${
                            targetRect.right -
                            popoverRect.width +
                            window.pageXOffset
                          }px`,
                      ...getTopPosition(targetRect, popoverRect),
                    };
                  }}
                >
                  <ModalWrapper>
                    <ModalList>
                      <ModalItem
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTweet(tweet._id);
                        }}
                      >
                        <ModalIcon className="delete">{Icons.delete}</ModalIcon>
                        <ModalIconDesc className="delete">Delete</ModalIconDesc>
                      </ModalItem>
                    </ModalList>
                  </ModalWrapper>
                </MenuPopover>
              </Menu>
            ) : null}
            {/* {isDeleteDropdownOpen && (
              <DeleteDropdown>
                <ModalWrapper>
                  <ModalList>
                    <ModalItem
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTweet(tweet._id);
                        toggleDeleteDropdown();
                      }}
                    >
                      <ModalIcon className="delete">{Icons.delete}</ModalIcon>
                      <ModalIconDesc className="delete">Delete</ModalIconDesc>
                    </ModalItem>
                  </ModalList>
                </ModalWrapper>
              </DeleteDropdown>
            )} */}
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
                  openNewReply();
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
                  if (tweet.hasLiked) {
                    unlikeTweet(tweet._id);
                  } else {
                    likeTweet(tweet._id);
                  }
                }}
              >
                <TweetAction className={tweet.hasLiked ? `hasLiked` : ``}>
                  {tweet.hasLiked ? Icons.heartFilled : Icons.heart}
                </TweetAction>
                {tweet.likesCount}
              </TweetActionItem>
            </TweetActionWrapper>
            <TweetActionWrapper>
              {/* <Popover
                disableReposition={false}
                containerStyle={{
                  boxShadow:
                    "rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px",
                  borderRadius: "5px",
                  background: "white",
                }}
                // contentLocation={({
                //   targetRect,
                //   popoverRect,
                //   position,
                //   align,
                //   nudgedLeft,
                //   nudgedTop,
                // }) => {
                //   return {
                //     top: nudgedTop,
                //     left: targetRect.right - popoverRect.width,
                //   };
                // }}
                isOpen={isPopoverOpen}
                position={"left"}
                onClickOutside={() => setIsPopoverOpen(!isPopoverOpen)}
                // contentLocation={{ right: 32 }}
                content={
                  <ModalWrapper>
                    <ModalList>
                      <ModalItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPopoverOpen(false);
                          openModal(e);
                        }}
                      >
                        <ModalIcon>{Icons.modalMessage}</ModalIcon>
                        <ModalIconDesc>Send via Direct Message</ModalIconDesc>
                      </ModalItem>
                    </ModalList>
                  </ModalWrapper>
                }
              >
                {(ref) => (
                  <TweetActionItem
                    ref={ref}
                    className="share"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPopoverOpen(!isPopoverOpen);
                    }}
                  >
                    <TweetAction>{Icons.share}</TweetAction>
                  </TweetActionItem>
                )}
              </Popover> */}
              <Menu>
                <StyledMenuButton>
                  <TweetActionItem
                    className="share"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <TweetAction>{Icons.share}</TweetAction>
                  </TweetActionItem>
                </StyledMenuButton>
                <MenuPopover
                  //exposing some reach ui under-the-hood stuff for custom positioning
                  position={(targetRect, popoverRect) => {
                    function getTopPosition(targetRect, popoverRect) {
                      const { directionUp } = getCollisions(
                        targetRect,
                        popoverRect
                      );
                      return {
                        top: directionUp
                          ? `${targetRect.top + window.pageYOffset}px`
                          : `${
                              targetRect.top +
                              // targetRect.height +
                              window.pageYOffset
                            }px`,
                      };
                    }
                    if (!targetRect || !popoverRect) {
                      return {};
                    }

                    const { directionLeft } = getCollisions(
                      targetRect,
                      popoverRect
                    );
                    return {
                      left: directionLeft
                        ? `${targetRect.left + window.pageXOffset}px`
                        : `${
                            targetRect.right -
                            popoverRect.width +
                            window.pageXOffset
                          }px`,
                      ...getTopPosition(targetRect, popoverRect),
                    };
                  }}
                >
                  <ModalWrapper>
                    <ModalList>
                      <ModalItem
                        onClick={(e) => {
                          e.stopPropagation();
                          openNewMessage();
                        }}
                      >
                        <ModalIcon>{Icons.modalMessage}</ModalIcon>
                        <ModalIconDesc>Send via Direct Message</ModalIconDesc>
                      </ModalItem>
                    </ModalList>
                  </ModalWrapper>
                </MenuPopover>
              </Menu>

              {/* {isDropdownOpen && (
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
              )} */}
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
