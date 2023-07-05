import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, redirectPath, ...props}) => (
  props.loggedIn ? 
  <Component {...props} /> : 
  <Navigate to={redirectPath} replace={true} />
);

export default ProtectedRoute;