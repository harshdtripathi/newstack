import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  // Check if the user is authenticated
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
