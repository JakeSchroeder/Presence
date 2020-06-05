import React, { useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./header";

const Wrapper = styled.div`
  /* margin: 0 auto; */
  /* max-width: 1400px; */
  width: 100%;
  height: 100%;
  position: relative;
`;

const Inner = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
`;

const Main = styled.main`
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainInner = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  width: 990px;
  @media (max-width: 1092px) {
    width: 920px;
  }
`;

const MainPositioner = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  height: 100%;
`;

const MainPositionerInner = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

const MainWrapper = styled.div`
  width: 100%;
`;

const PositonThing = styled.div`
  min-width: calc(62.79px);
  min-height: 39px;
  padding: 0 15px;
  /* position: absolute; */
`;

const Layout = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Inner>
          <Header />

          <Main>
            <MainInner>
              <MainPositioner>
                <MainPositionerInner>{children}</MainPositionerInner>
              </MainPositioner>
            </MainInner>
          </Main>
        </Inner>
      </Wrapper>
    </>
  );
};

export default Layout;
