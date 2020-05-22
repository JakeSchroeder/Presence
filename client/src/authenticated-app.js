import React from "react";
import { Switch, Route, Link as RouterLink, useMatch } from "react-router-dom";
import { homepage } from "../package.json";
import Layout from "./components/layout";
import Home from "./components/home";
import Explore from "./components/explore";
import Messages from "./components/messages";
import Profile from "./components/profile";
import NotFound from "./components/404";

import { useAuth } from "./context/authContext";

function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/messages" component={Messages} />
      <Route path="/profile" component={Profile} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default AuthenticatedApp;
