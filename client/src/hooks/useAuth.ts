import axios from 'axios';
import { useState } from 'react';
import { NewUser, User } from '../models/user';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

export const useAuth = (): {
  user: User;
  checkIfNewUser: (data: NewUser) => Promise<boolean>;
  signIn: (data: NewUser) => Promise<void>;
  signUp: (data: NewUser) => Promise<void>;
  signOut: () => void;
} => {
  const [user, setUser] = useState({
    _id: 'null',
    google_id: 'null',
    email: 'null',
    name: 'null',
    image: 'null',
    created_at: new Date()
  });

  const checkIfNewUser = async (data: NewUser): Promise<boolean> => {
    try {
      const authResult = await axios.get(`${BASE_URL}/user/exists/${data.google_id}`);
      return authResult?.data.result === false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const signIn = async (data: NewUser): Promise<void> => {
    try {
      const authResult = await axios.get(`${BASE_URL}/user/${data.google_id}`);
      const newUser = authResult?.data?.result?._doc;
      setUser(newUser);
      // toastsuccess('Login Successfull'); // TODO
    } catch (err) {
      console.error(err);
      // toasterror('Login Failed'); // TODO
    }
  };

  const signUp = async (data: NewUser): Promise<void> => {
    try {
      const authResult = await axios.post(`${BASE_URL}/user`, data);
      const newUser = authResult?.data.result;
      setUser(newUser);
      // toastsuccess('Sign Up Successfull'); // TODO
    } catch (error) {
      console.error(error);
      // toasterror('An Error Occuered'); // TODO
    }
  };

  const signOut = (): void => {
    setUser({
      _id: 'null',
      google_id: 'null',
      email: 'null',
      name: 'null',
      image: 'null',
      created_at: new Date()
    });
  };

  return { user, checkIfNewUser, signIn, signUp, signOut };
};
