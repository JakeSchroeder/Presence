import styled from "styled-components";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
export const Colors = {
  primary: "#1Da1F2",
  primary: "#f9d623",
  red: "#e02460",
  redHover: "rgba(224,36,94,.1)",
  hover: "rgba(249, 214, 35, .1)",
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
    background: ${Colors.hover};
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
    background: #eac428;
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
    background: #eac428;
  }
`;

export const GenericBtn = ({ children, className, onClick }) => (
  <NormalBtn onClick={onClick} className={className}>
    {children}
  </NormalBtn>
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
  width: calc(100% / 2);
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

// export const setAuthToken = (token) => {
//   if (token) {
//     // Apply authorization token to every request if logged in
//     axios.defaults.headers.common["Authorization"] = token;
//   } else {
//     // Delete auth header
//     delete axios.defaults.headers.common["Authorization"];
//   }
// };
