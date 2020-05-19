import React, { useContext } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import Header from "./header";
import { Colors } from "../../utils";
import Explore from "./components/../../explore";
import Home from "./components/../../home";
import Messages from "./components/../../messages";
import Profile from "./components/../../profile";
import Thread from "./components/../../thread";
// import { AuthContext } from "../../App";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";

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

const Layout = ({}) => {
  // let { path } = useRouteMatch();

  return (
    <Router>
      <Wrapper>
        <Header />
        <Main>
          <Switch>
            <Redirect exact from="/" to="/explore" />
            <Route exact path="/home" component={Home} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/messages" component={Messages} />
            {/* <Route exact path="/profile" component={Profile} /> */}

            <Route path={`/:userName/status/:id`} component={Thread} />
            <Route exact path={`/:userName`} component={Profile} />
          </Switch>
        </Main>
      </Wrapper>
    </Router>
  );
};

export default Layout;
