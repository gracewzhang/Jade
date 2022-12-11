import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

const RequireAuth = (props: any): any => {
  const { children } = props;
  const location = useLocation();
  const auth = useAuthContext();
  if (auth.user === null) {
    return <Navigate to='/login' state={{ from: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
