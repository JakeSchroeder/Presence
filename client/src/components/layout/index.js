import React, { useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "../../styles/colors";
import Header from "./header";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

const GlobalStyles = createGlobalStyle`
  *,*:after, *:before {
    box-sizing: border-box;
  }
  html {
    width: 100%;
    height: 100%;
    font-size: 15px;

  }
  body {
    color: ${Colors.body};
    margin: 0;
    padding: 0;
    width: 100vw;
    overflow-x: hidden;
    height: 100%;
    font-size: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    line-height: 1.3125;
    overflow-y: scroll;
    overscroll-behavior-y: none;
  }
  #root {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: ${({ height }) => height}px;
  }
  ul {
    margin: 0;
    padding: 0;
  
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  h1,h2,h3,h4 {
    color: ${Colors.title};
    margin: 0;
    font-weight: 700;
  }
  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }
  p {
    margin: 0;
  }
  
`;

const Wrapper = styled.div`
  /* margin: 0 auto; */
  /* max-width: 1400px; */
  width: 100%;
  height: 100%;
  position: relative;
  align-items: stretch;

  flex-basis: 0%;
  flex-grow: 1;
  flex-shrink: 1;
`;

const Inner = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
`;

const Main = styled.main`
  min-height: ${({ height }) => height}px;
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  min-height: 100%;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 1021px) {
    flex-grow: 2;
  }

  @media (max-width: 702px) {
    flex-grow: 1;
    width: 100%;
    align-items: stretch;
  }
`;

const MainInner = styled.div`
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  width: 990px;

  @media (max-width: 1092px) {
    width: 920px;
  }

  @media (max-width: 1021px) {
    width: 600px;
  }

  @media (max-width: 702px) {
    width: 100%;
  }
  /* 
  @media (max-width: 720px) {
    width: 100%;
  } */
`;

const MainPositioner = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  height: 100%;
  @media (max-width: 702px) {
    width: 100%;
  }
`;

const MainPositionerInner = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
  @media (max-width: 702px) {
    width: 100%;
  }
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
  const { height } = useWindowDimensions();
  return (
    <>
      <GlobalStyles height={height} />

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
