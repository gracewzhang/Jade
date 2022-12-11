import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext({ user: null });

const useAuthContext = (): any => useContext(AuthContext);

const AuthProvider = (props: any): JSX.Element => {
  const auth = useAuth();
  const { children } = props;

  return (<AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>);
};

export { useAuthContext, AuthProvider };
