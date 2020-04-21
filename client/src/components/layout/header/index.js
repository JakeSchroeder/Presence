import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Icons from "../../icons";
import { Colors, TweetBtn } from "../../../utils";
import profile_src from "../../../images/profile.png";
//import logo_src from "../../../images/logo.png";

const HeaderWrapper = styled.header`
  width: 325px;
  padding: 20px;
  overflow-y: auto;
`;

const HeaderLogo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  width: 49px;
  height: 49px;
  &:hover {
    background: ${Colors.hover};
  }
  svg {
    height: 2rem;
    fill: ${Colors.primary};
  }
`;

const HeaderNav = styled.nav``;

const NavList = styled.ul``;

const NavItemLink = styled(NavLink)`
  padding: 4px 0;
  display: block;

  &.active li {
    color: ${Colors.primary};
    svg path {
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
  width: 24px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 100%;
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
  return (
    <HeaderWrapper>
      <NavLink exact to="/home" activeClassName="active">
        <HeaderLogo>{Icons.logo}</HeaderLogo>
      </NavLink>
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
          <NavItemLink exact to="/profile" activeClassName="active">
            <NavItem>
              <NavIcon>
                <ProfileImg src={profile_src} />
              </NavIcon>
              Profile
            </NavItem>
          </NavItemLink>
        </NavList>
      </HeaderNav>
      <TweetBtn>Tweet</TweetBtn>
    </HeaderWrapper>
  );
};

export default Header;
