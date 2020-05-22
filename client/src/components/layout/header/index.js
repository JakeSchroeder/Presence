import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Icons from "../../icons";
import { Colors, TweetBtn } from "../../../utils";
import profile_src from "../../../images/profile.png";
import AccountSwitcher from "./account";
import NewTweetModal from "../../tweets/new-tweet/modal";
import useModal from "../../../hooks/useModal";

import { useAuth } from "../../../context/authContext";

const HeaderWrapper = styled.header`
  width: 335px;
  padding-left: 20px;
  padding-right: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const Header = () => {
  // let { path } = useRouteMatch();
  // const { state: authState } = useContext(AuthContext);
  // const { displayName, userName, id } = authState.user;

  const { user, logout } = useAuth();
  console.log(user);

  const { openModal, closeModal, isModalOpen, Modal } = useModal({
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
                  <NavIcon>{Icons.home}</NavIcon>Home
                </NavItem>
              </NavItemLink>
              <NavItemLink exact to="/explore" activeClassName="active">
                <NavItem>
                  <NavIcon>{Icons.explore}</NavIcon>Explore
                </NavItem>
              </NavItemLink>
              <NavItemLink exact to="/messages" activeClassName="active">
                <NavItem>
                  <NavIcon>{Icons.messaging}</NavIcon>Messages
                </NavItem>
              </NavItemLink>
              <NavItemLink
                // to={{ pathname: `/${userName}`, state: { userId: id } }}
                to="/profile"
                activeClassName="active"
              >
                <NavItem>
                  <NavIcon>{Icons.profile}</NavIcon>
                  Profile
                </NavItem>
              </NavItemLink>
            </NavList>
          </HeaderNav>
          <TweetBtn
            onClick={(e) => {
              openModal(e);
            }}
          >
            Tweet
          </TweetBtn>
        </HeaderTop>
        <HeaderBottom>
          <AccountSwitcher
            displayName={user.displayName}
            userName={user.userName}
            logout={logout}
          />
        </HeaderBottom>
      </HeaderWrapper>
    </>
  );
};

export default Header;
