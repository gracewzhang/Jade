import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { Props } from '../../types/props';

const RequireAuth = (props: Props): JSX.Element => {
  const { children } = props;
  const location = useLocation();
  const auth = useAuthContext();
  if (auth.user === undefined) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
