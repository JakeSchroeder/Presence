import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../App";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state: authState } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
