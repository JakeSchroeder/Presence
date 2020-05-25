import React, { useContext } from "react";
import styled from "styled-components";
import Header from "./header";

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  height: 100%;
`;

const Main = styled.main`
  width: 100%;
  min-height: 100%;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Main>{children}</Main>
    </Wrapper>
  );
};

export default Layout;
