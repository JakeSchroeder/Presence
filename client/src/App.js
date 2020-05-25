import React, { useState, useEffect, createContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import PivateRoute from "./components/private-route";
// import Layout from "./components/layout";
import { Colors } from "./styles/colors";
import { FullPageSpinner } from "./components/lib";
import { useAuth } from "./context/authContext";
// import isEmpty from "is-empty";
// import Login from "./components/auth/login";
// import Register from "./components/auth/register";
// import NotFound from "./components/404";

// import jwt_decode from "jwt-decode";
// import { setAuthToken } from "./utils";

// export const AuthContext = createContext();

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       const { token } = action.payload;
//       setAuthToken(token);
//       const decodedUser = jwt_decode(token);
//       // localStorage.setItem("user", JSON.stringify(decodedUser));
//       localStorage.setItem("token", JSON.stringify(token));
//       console.log(decodedUser);

//       return {
//         ...state,
//         isAuthenticated: true,
//         user: decodedUser,
//         token: token,
//       };
//     case "LOGOUT":
//       localStorage.clear();
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// function App({ history }) {
//   // const [state, dispatch] = React.useReducer(reducer, initialState);

//   // console.log(localStorage);

//   // useEffect(() => {
//   //   const token = JSON.parse(localStorage.getItem("token") || null);

//   //   if (token) {
//   //     dispatch({
//   //       type: "LOGIN",
//   //       payload: {
//   //         token,
//   //       },
//   //     });
//   //   }
//   // }, []);

//   return (
//     <>
//       <GlobalStyles />
//       {/* <AuthContext.Provider value={{ state, dispatch }}> */}
//       <Router>
//         <Switch>
//           <Route exact path="/login" component={Login} />
//           <Route exact path="/register" component={Register} />
//           <PivateRoute path="/" component={Layout} />
//           {/* <Route component={localStorage.token ? Layout : NotFound} /> */}
//         </Switch>
//       </Router>
//       {/* </AuthContext.Provider> */}
//     </>
//   );
// }

// export default App;

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ "./authenticated-app")
);
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export { App };
