import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";
import { Colors } from "../styles/colors";
import Icons from "./icons";
import { withRouter } from "react-router-dom";
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
`;

const StyledMain = styled.main`
  width: 100%;
  max-width: 600px;
  height: 100%;
  border-left: 1px solid ${Colors.border};
  border-right: 1px solid ${Colors.border};
  flex-shrink: 0;
  /* justify-content: space-between; */
  min-height: 100%;

  @media (max-width: 702px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    max-width: none;
  }
`;

const SidebarWrapper = styled.div`
  margin-right: 10px;
  width: 350px;
  min-height: 100%;
  @media (max-width: 1092px) {
    width: 290px;
  }

  @media (max-width: 1021px) {
    display: none;
  }
`;

const SidebarInner = styled.div`
  /* width: 350px; */
  position: sticky;
  top: ${({ top }) => (top ? `10px` : `0`)};
`;

const SidebarFooter = styled.p`
  margin-top: 15px;
`;

const HomeTitleWrapper = styled.div`
  background: white;
  z-index: 10;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  height: 53px;
  padding: 0 15px;
  border-bottom: 1px solid ${Colors.border};
`;

export const MainInner = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Main = ({ children }) => <StyledMain>{children}</StyledMain>;

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

export const GoBackBtn = ({ onClick }) => (
  <StyledArrow onClick={onClick}>{Icons.arrowLeft}</StyledArrow>
);

export const Sidebar = ({ children, top }) => (
  <SidebarWrapper>
    <SidebarInner top={top}>
      {children}
      <SidebarFooter>© 2020 Presence</SidebarFooter>
    </SidebarInner>
  </SidebarWrapper>
);

export const MainTitle = ({ children }) => (
  <HomeTitleWrapper>{children}</HomeTitleWrapper>
);

export const Seperator = styled.div`
  height: 10px;
  background: ${Colors.border};
  width: 100%;
`;

export const Spinner = styled.div`
  display: inline-block;
  width: ${({ width }) => (width ? width : `50`)}px;
  height: ${({ height }) => (height ? height : `50`)}px;
  border: 3px solid rgba(0, 0, 0, 0.33);
  border-radius: 50%;
  border-top-color: ${Colors.primary};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

const FullPageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  font-size: 4em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export function FullPageSpinner() {
  return (
    <FullPageWrapper>
      <Spinner />
    </FullPageWrapper>
  );
}

const FullPageErrorWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  color: red;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function FullPageErrorFallback({ error }) {
  return (
    <FullPageErrorWrapper>
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </FullPageErrorWrapper>
  );
}

const ErrorWrapper = styled.div`
  color: red;
`;

const ErrorText = styled.pre`
  margin: 0;
`;

export function ErrorMessage({ error, ...props }) {
  return (
    <ErrorWrapper role="alert" {...props}>
      <span>There was an error: </span>
      <ErrorText>{error.message}</ErrorText>
    </ErrorWrapper>
  );
}

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
  width: 90%;
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
  @media (max-width: 1280px) {
    display: none;
  }
`;

export const NormalBtn = styled.button`
  min-height: 39px;
  cursor: ${({ disabled }) => (disabled ? `default` : `pointer`)};
  border-radius: 999px;
  padding: 0 16px;
  border: 0;
  outline: 0;
  background: ${({ disabled }) => (disabled ? `#ffe876` : `${Colors.primary}`)};
  color: white;
  font-size: 16px;
  font-family: inherit;
  line-height: 39px;
  &:hover {
    background: ${({ disabled }) => (disabled ? `#ffe876` : `#eac428`)};
  }
`;

export const GenericBtn = ({ children, className, onClick, disabled }) => (
  <NormalBtn onClick={onClick} className={className} disabled={disabled}>
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
