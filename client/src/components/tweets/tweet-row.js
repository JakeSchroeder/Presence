import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Icons from "../icons";
import { Colors } from "../../styles/colors";
import { useListItem } from "../../utils/list-items";

import profile_src from "../../images/profile.png";

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

function TweetRow({ tweet }) {
  const { author, date, avatarPath, content, replies, likes } = tweet;
  const listItem = useListItem(tweet._id);
  console.log(listItem);
  const id = `book-row-book-${tweet._id}`;

  return (
    <TweetWrapper>
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
                // openReplyModal(e);
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
                // toggleDropdown(e);
              }}
            >
              <TweetAction>{Icons.share}</TweetAction>
            </TweetActionItem>

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
                      <ModalIcon>{Icons.modalMessage}</ModalIconDesc>
                      <ModalIconDesc>Send via Direct Message</ModalIconDesc>
                    </ModalItem>
                   
                  </ModalList>
                </ModalWrapper>
              </Dropdown>
            )} */}
          </TweetActionWrapper>
        </TweetActions>
        {tweet?.candDelete ? <p>can Delete</p> : null}
        {tweet.replies > 0 ? <ShowThread>Show this thread</ShowThread> : null}
      </TweetContent>
    </TweetWrapper>
  );
}

export { TweetRow };
