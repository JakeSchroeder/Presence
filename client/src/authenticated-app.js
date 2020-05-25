import React from "react";
import { Switch, Route, Link as RouterLink, useMatch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { homepage } from "../package.json";
import Layout from "./components/layout";
import Home from "./components/home";
import Explore from "./components/explore";
import Messages from "./components/messages";
import Profile from "./components/profile";
import NotFound from "./components/404";

import { ErrorMessage, FullPageErrorFallback } from "./utils/elements";

import { useAuth } from "./context/authContext";

function ErrorFallback({ error }) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}

function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Layout>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppRoutes />
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/explore" component={Explore} />
      <Route exact path="/messages" component={Messages} />
      <Route exact path="/:userName" component={Profile} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default AuthenticatedApp;
