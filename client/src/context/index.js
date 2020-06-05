import React from "react";
import { homepage } from "../../package.json";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { AuthProvider } from "./authContext";
// import { UserProvider } from "./userContext";

const queryConfig = {
  retry(failureCount, error) {
    if (error.status === 404) return false;
    else if (failureCount < 2) return true;
    else return false;
  },
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
};

// const fullUrl = new URL(homepage);
// const basename = fullUrl.pathname.endsWith("/")
//   ? fullUrl.pathname.slice(0, fullUrl.pathname.length - 1)
//   : fullUrl.pathname;

const AppProviders = ({ children }) => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryConfigProvider>
  );
};

export { AppProviders };
