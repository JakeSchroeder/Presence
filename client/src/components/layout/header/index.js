import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Toast from "../../toast";
import Icons from "../../icons";
import { Colors } from "../../../styles/colors";
import { TweetBtn } from "../../lib";
import profile_src from "../../../images/profile.png";
import AccountSwitcher from "./account";
import NewTweetModal from "../../tweets/new-tweet/modal";
import useModal from "../../../hooks/useModal";

import { useAuth } from "../../../context/authContext";

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

const HeaderWrapper = styled.header`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  /* padding-left: 140px; */
  align-items: flex-end;
`;

const HeaderInner = styled.div`
  width: 275px;
  @media (max-width: 1280px) {
    width: 88px;
  }
`;

const HeaderPositoner = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
`;

const HeaderPositonerInner = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 275px;

  @media (max-width: 1280px) {
    width: 88px;
  }
`;

const HeaderTop = styled.div``;

const HeaderBottom = styled.div``;

const LogoWrapper = styled.h1`
  padding: 2px 0;
  font-size: 15px;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  width: 49px;
  height: 49px;
  &:hover {
    background: ${Colors.hover};
  }
  svg {
    width: 2em;
    height: 2em;
    /* fill: ${Colors.primary}; */
  }
`;

const HeaderNav = styled.nav``;

const NavList = styled.ul``;

const NavItemLink = styled(NavLink)`
  padding: 4px 0;
  display: block;

  &.active li {
    color: ${Colors.primary};
    svg {
      fill: ${Colors.primary};
    }
    svg:nth-of-type(1) {
      display: none;
    }

    svg:nth-of-type(2) {
      display: flex;
    }
  }

  & li svg:nth-of-type(2) {
    display: none;
  }

  &.active li img {
    border: 2px solid ${Colors.primary};
  }

  /* &.active li {
    @media (max-width: 1021px) {
      svg:nth-of-type(2) {
        display: block;
      }
    }
  } */
`;

const NavItem = styled.li`
  border-radius: 99px;
  color: ${Colors.title};
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;

  &:hover {
    background: ${Colors.hover};
    color: ${Colors.primary};
  }
  &:hover svg {
    fill: ${Colors.primary};
  }
`;

const NavIcon = styled.div`
  /* width: 24px; */
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    height: 1.75rem;
  }

  @media (max-width: 1280px) {
    margin-right: 0;
  }
`;

const ProfileImg = styled.img`
  width: 30px;
  border-radius: 50%;
  border: 2px solid transparent;
`;

const PresenceLogo = styled.h1`
  color: ${Colors.primary};
  font-size: 42px;
`;

const NavText = styled.div`
  @media (max-width: 1280px) {
    display: none;
  }
`;

const MobileTweetBtn = styled.button`
  margin-top: 10px;
  min-height: 50px;
  min-width: 50px;
  cursor: pointer;
  border-radius: 50%;
  /* padding: 0 16px; */
  border: 0;
  outline: 0;
  background: ${Colors.primary};
  color: white;
  font-size: 16px;
  font-family: inherit;
  display: none;
  &:hover {
    background: #eac428;
  }

  @media (max-width: 1280px) {
    display: flex;
    align-items: center;
    justify-content: center;
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

const Header = () => {
  const [isNewTweetOpen, setNewTweetOpen] = useState(false);
  const openNewTweet = () => setNewTweetOpen(true);
  const closeNewTweet = () => setNewTweetOpen(false);

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastLink, setToastLink] = useState();

  const showSuccessToast = (tweetLink) => {
    console.log(tweetLink);
    setToastLink(tweetLink);
    setIsToastOpen(true);
    setInterval(() => {
      setIsToastOpen(false);
    }, 3000);
    console.log(isToastOpen);
  };

  const { user, logout } = useAuth();
  console.log(user);

  return (
    <>
      {isToastOpen ? (
        <Toast message="Your Tweet was sent" link={toastLink} />
      ) : null}

      {isNewTweetOpen && (
        <StyledDialogOverlay className="reply" onDismiss={closeNewTweet}>
          <StyledDialogContent>
            <NewTweetModal
              showSuccessToast={showSuccessToast}
              closeNewTweet={closeNewTweet}
            />
          </StyledDialogContent>
        </StyledDialogOverlay>
      )}
      {/* {isModalOpen && (
        <Modal>
          <NewTweetModal closeModal={closeModal} />
        </Modal>
      )} */}
      <HeaderWrapper>
        <HeaderInner>
          <HeaderPositoner>
            <HeaderPositonerInner>
              <HeaderTop>
                <LogoWrapper rol="heading">
                  <NavLink exact to="/home" activeClassName="active">
                    <HeaderLogo>{Icons.presence}</HeaderLogo>
                  </NavLink>
                </LogoWrapper>
                <HeaderNav>
                  <NavList>
                    <NavItemLink exact to="/home" activeClassName="active">
                      <NavItem>
                        <NavIcon>
                          {Icons.home}
                          {Icons.homeFilled}
                        </NavIcon>

                        <NavText>Home</NavText>
                      </NavItem>
                    </NavItemLink>
                    <NavItemLink exact to="/explore" activeClassName="active">
                      <NavItem>
                        <NavIcon>
                          {Icons.explore}
                          {Icons.exploreFilled}
                        </NavIcon>
                        <NavText>Explore</NavText>
                      </NavItem>
                    </NavItemLink>
                    <NavItemLink exact to="/messages" activeClassName="active">
                      <NavItem>
                        <NavIcon>
                          {Icons.messaging}
                          {Icons.messagingFilled}
                        </NavIcon>
                        <NavText>Messages</NavText>
                      </NavItem>
                    </NavItemLink>
                    <NavItemLink
                      to={{
                        pathname: `/${user.userName}`,
                        state: { userId: user.id },
                      }}
                      // to={`/profile/${user.userName}`}
                      // to="/profile"
                      activeClassName="active"
                    >
                      <NavItem>
                        <NavIcon>
                          {Icons.profile}
                          {Icons.profileFilled}
                        </NavIcon>
                        <NavText>Profile</NavText>
                      </NavItem>
                    </NavItemLink>
                  </NavList>
                </HeaderNav>
                <MobileTweetBtn
                  onClick={(e) => {
                    openNewTweet();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
                    />
                  </svg>
                </MobileTweetBtn>
                <TweetBtn
                  onClick={(e) => {
                    openNewTweet();
                  }}
                >
                  Quack
                </TweetBtn>
              </HeaderTop>
              <HeaderBottom>
                <AccountSwitcher
                  displayName={user.displayName}
                  userName={user.userName}
                  logout={logout}
                />
              </HeaderBottom>
            </HeaderPositonerInner>
          </HeaderPositoner>
        </HeaderInner>
      </HeaderWrapper>
    </>
  );
};

export default Header;
