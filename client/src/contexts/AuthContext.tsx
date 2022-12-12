import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { NewUser, User } from '../models/user';

const AuthContext = createContext({
  user: {
    _id: 'null',
    google_id: 'null',
    email: 'null',
    name: 'null',
    image: 'null',
    created_at: new Date()
  },
  checkIfNewUser: async (data: NewUser) => { return true; },
  signIn: async (data: NewUser) => {},
  signUp: async (data: NewUser) => {},
  signOut: () => {}
});

const useAuthContext = (): {
  user: User;
  checkIfNewUser: (data: NewUser) => Promise<boolean>;
  signIn: (data: NewUser) => Promise<void>;
  signUp: (data: NewUser) => Promise<void>;
  signOut: () => void;
} => useContext(AuthContext);

const AuthProvider = (props: any): JSX.Element => {
  const auth = useAuth();
  const { children } = props;

  return (<AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>);
};

export { useAuthContext, AuthProvider };
