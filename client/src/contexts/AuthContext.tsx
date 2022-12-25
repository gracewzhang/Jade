import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../models/user';

interface AuthContextProps {
  user: User | undefined;
  checkIfNewUser: (data: User) => Promise<boolean>;
  signIn: (data: User) => Promise<void>;
  signUp: (data: User) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  checkIfNewUser: async (data: User) => {
    return true;
  },
  signIn: async (data: User) => {},
  signUp: async (data: User) => {},
  signOut: () => {}
});

const useAuthContext = (): {
  user: undefined | User;
  checkIfNewUser: (data: User) => Promise<boolean>;
  signIn: (data: User) => Promise<void>;
  signUp: (data: User) => Promise<void>;
  signOut: () => void;
} => useContext(AuthContext);

const AuthProvider = (props: any): JSX.Element => {
  const auth = useAuth();
  const { children } = props;

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthProvider };
