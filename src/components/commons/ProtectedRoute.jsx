import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, render, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user === null) {
          return <Redirect to="/login" />;
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
