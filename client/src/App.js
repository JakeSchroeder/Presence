import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "./components/layout";
import { Colors } from "./utils";
import Explore from "./components/explore";
import Home from "./components/home";
import Messages from "./components/messages";
import Profile from "./components/profile";

const GlobalStyles = createGlobalStyle`
  *,*::after, *::before {
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
    width: 100%;
    height: 100%;
    font-size: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    line-height: 1.3125;
  }
  #root {
    width: 100%;
    height: 100%;
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

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Layout>
          <Switch>
            <Redirect exact from="/" to="explore" />
            <Route exact path="/home" component={Home} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/messages" component={Messages} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
