import React, { useState, useEffect, createContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PivateRoute from "./components/private-route";
import Layout from "./components/layout";
import { Colors } from "./utils";
import isEmpty from "is-empty";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import NotFound from "./components/404";

import jwt_decode from "jwt-decode";
import { setAuthToken } from "./utils";

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

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { token } = action.payload;
      setAuthToken(token);
      const decodedUser = jwt_decode(token);
      // localStorage.setItem("user", JSON.stringify(decodedUser));
      localStorage.setItem("token", JSON.stringify(token));
      console.log(decodedUser);

      return {
        ...state,
        isAuthenticated: true,
        user: decodedUser,
        token: token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function App({ history }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") || null);

    if (token) {
      dispatch({
        type: "LOGIN",
        payload: {
          token,
        },
      });
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <AuthContext.Provider value={{ state, dispatch }}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PivateRoute path="/" component={Layout} />
            {/* <Route
              component={localStorage.jwtTokenPresence ? Layout : NotFound}
            /> */}
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
