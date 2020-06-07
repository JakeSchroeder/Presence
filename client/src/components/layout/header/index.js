import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Icons from "../../icons";
import { Colors } from "../../../styles/colors";
import { TweetBtn } from "../../lib";
import profile_src from "../../../images/profile.png";
import AccountSwitcher from "./account";
import NewTweetModal from "../../tweets/new-tweet/modal";
import useModal from "../../../hooks/useModal";

import { useAuth } from "../../../context/authContext";

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
  }

  &.active li img {
    border: 2px solid ${Colors.primary};
  }
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

const Header = () => {
  // let { path } = useRouteMatch();
  // const { state: authState } = useContext(AuthContext);
  // const { displayName, userName, id } = authState.user;

  const { user, logout } = useAuth();
  console.log(user);

  const [openModal, closeModal, isModalOpen, Modal] = useModal({
    background: "rgba(0, 0, 0, 0.5)",
    modalStyle: `
      position: fixed;
      left: 50%;
      top: 5%;
      transform: translate(-50%,-5%);
      z-index: 1000;
    `,
  });

  return (
    <>
      {isModalOpen && (
        <Modal>
          <NewTweetModal closeModal={closeModal} />
        </Modal>
      )}
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
                        <NavIcon>{Icons.home}</NavIcon>
                        <NavText>Home</NavText>
                      </NavItem>
                    </NavItemLink>
                    <NavItemLink exact to="/explore" activeClassName="active">
                      <NavItem>
                        <NavIcon>{Icons.explore}</NavIcon>
                        <NavText>Explore</NavText>
                      </NavItem>
                    </NavItemLink>
                    <NavItemLink exact to="/messages" activeClassName="active">
                      <NavItem>
                        <NavIcon>{Icons.messaging}</NavIcon>
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
                        <NavIcon>{Icons.profile}</NavIcon>
                        <NavText>Profile</NavText>
                      </NavItem>
                    </NavItemLink>
                  </NavList>
                </HeaderNav>
                <MobileTweetBtn
                  onClick={(e) => {
                    openModal(e);
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
                    openModal(e);
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
