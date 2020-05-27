import "./bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Colors } from "./styles/colors";
import { createGlobalStyle } from "styled-components";
import { AppProviders } from "./context";

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

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
