import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Colors } from "../../../utils";
import Icons from "../../icons";

const TweetWrapper = styled.div`
  display: flex;
  padding: 10px 15px 0 15px;

  border-bottom: 1px solid ${Colors.border};
`;

const TweetImgWrapper = styled.div`
  margin: 0 5px;
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
  z-index: 999;
  position: absolute;
  background: white;
  top: 10px;
  right: calc(100% - 26px);

  box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px,
    rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
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

const ActionModal = ({ toggleModal }) => {
  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    toggleModal();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return (
    <>
      <ModalWrapper ref={node}>
        <ModalList>
          <ModalItem>
            <ModalIcon>{Icons.modalMessage}</ModalIcon>
            <ModalIconDesc>Send via Direct Message</ModalIconDesc>
          </ModalItem>
        </ModalList>
      </ModalWrapper>
    </>
  );
};

const Tweet = ({ tweet }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      <TweetWrapper>
        <TweetImgWrapper>
          <TweetImg src={tweet.img_src} />
        </TweetImgWrapper>
        <TweetContent>
          <NameWrapper>
            <DisplayName>{tweet.display_name}</DisplayName>
            <UserName>{tweet.user_name}</UserName>
          </NameWrapper>
          <TweetDescription>{tweet.tweet_desc}</TweetDescription>
          <TweetActions>
            <TweetActionWrapper>
              <TweetActionItem className="reply">
                <TweetAction>{Icons.reply}</TweetAction>
                {tweet.replies}
              </TweetActionItem>
            </TweetActionWrapper>
            <TweetActionWrapper>
              <TweetActionItem className="like">
                <TweetAction>{Icons.heart}</TweetAction>
                {tweet.likes}
              </TweetActionItem>
            </TweetActionWrapper>
            <TweetActionWrapper>
              <TweetActionItem
                className="share"
                onClick={() => {
                  toggleModal();
                }}
              >
                <TweetAction>{Icons.share}</TweetAction>
              </TweetActionItem>
              {isModalOpen ? <ActionModal toggleModal={toggleModal} /> : null}
            </TweetActionWrapper>
          </TweetActions>
          {tweet.replies > 0 ? <ShowThread>Show this thread</ShowThread> : null}
        </TweetContent>
      </TweetWrapper>
    </>
  );
};

export default Tweet;
