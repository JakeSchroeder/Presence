import styled from "styled-components";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export const Colors = {
  primary: "#1Da1F2",
  red: "#e02460",
  redHover: "rgba(224,36,94,.1)",
  hover: "rgba(29, 161, 242, .1)",
  border: "#e0e0e0",
  light: "#f5f8fa",
  body: "#657786",
  title: "#14171A",
};

export const FollowBtn = styled.button`
  cursor: pointer;
  min-height: 30px;
  border-radius: 999px;
  padding: 0 16px;
  border: 0;
  outline: 0;
  border: 1px solid ${Colors.primary};
  background: transparent;
  color: ${Colors.primary};
  font-size: 16px;
  font-family: inherit;

  &:hover {
    background: rgba(29, 161, 242, 0.1);
  }
`;

export const TweetBtn = styled.button`
  margin-top: 10px;
  min-height: 50px;
  cursor: pointer;
  width: 100%;
  border-radius: 999px;
  padding: 0 16px;
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

export const NormalBtn = styled.button`
  min-height: 39px;
  cursor: pointer;
  border-radius: 999px;
  padding: 0 16px;
  border: 0;
  outline: 0;
  background: ${Colors.primary};
  color: white;
  font-size: 16px;
  font-family: inherit;
  line-height: 39px;
  &:hover {
    background: rgb(26, 145, 218);
  }
`;

export const GenericBtn = ({ children, className }) => (
  <NormalBtn className={className}>{children}</NormalBtn>
);

export const StyledTabList = styled(TabList)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${Colors.border};
`;

export const StyledTab = styled(Tab)`
  cursor: pointer;
  text-align: center;
  width: calc(100% / 3);
  padding: 15px;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  &:hover {
    background: ${Colors.hover};
  }

  &.react-tabs__tab--selected {
    color: ${Colors.primary};
    border-bottom: 2px solid ${Colors.primary};
  }
`;

const StyledArrow = styled.span`
  cursor: pointer;
  margin-right: 20px;
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
    width: 24px;
    fill: ${Colors.primary};
  }
`;

export const GoBackBtn = ({ children, onClick }) => (
  <StyledArrow onClick={onClick}>{children}</StyledArrow>
);
