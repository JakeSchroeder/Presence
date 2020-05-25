import React from "react";
import styled from "styled-components";
import { Colors } from "./index";
import Icons from "../components/icons";
import { withRouter } from "react-router-dom";
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
`;

const StyledMain = styled.main`
  width: 100%;

  height: 100%;
  border-left: 1px solid ${Colors.border};
  border-right: 1px solid ${Colors.border};
`;

const SidebarWrapper = styled.div`
  padding: 10px 20px;
`;

const SidebarFooter = styled.p`
  margin-top: 15px;
`;

const HomeTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 53px;
  padding: 0 15px;
  border-bottom: 1px solid ${Colors.border};
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

export const Sidebar = ({ children }) => (
  <SidebarWrapper>
    {children}
    <SidebarFooter>© 2020 Presence</SidebarFooter>
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
  font-size: 4em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
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
