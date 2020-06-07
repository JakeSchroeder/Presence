import React from "react";
import {
  Switch,
  Route,
  Link as RouterLink,
  useMatch,
  Redirect,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { homepage } from "../package.json";
import Layout from "./components/layout";
import { Home } from "./screens/home";
import { Explore } from "./screens/explore";
import { Thread } from "./screens/thread";
import { Messages } from "./screens/messages";
import { Profile } from "./screens/profile";
import { NotFound } from "./screens/not-found";

import { ErrorMessage, FullPageErrorFallback, Spinner } from "./components/lib";

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
    <>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/home" component={Home} />
        <Route exact path="/explore" component={Explore} />

        <Route exact path="/messages" component={Messages} />
        <Route exact path="/:userName" component={Profile} />
        <Route exact path="/:userName/status/:tweetId" component={Thread} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default AuthenticatedApp;
