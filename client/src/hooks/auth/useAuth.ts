import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { User } from '../../types/user';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

export const useAuth = (): {
  user: undefined | User;
  checkIfNewUser: (data: User) => Promise<boolean>;
  signIn: (data: User) => Promise<void>;
  signUp: (data: User) => Promise<void>;
  signOut: () => void;
} => {
  const [user, setUser] = useState<User>();

  const checkIfNewUser = async (data: User): Promise<boolean> => {
    try {
      const authResult = await axios.get(
        `${BASE_URL}/user/exists/${data.google_id}`
      );
      return authResult?.data.result === false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const signIn = async (data: User): Promise<void> => {
    try {
      const authResult = await axios.get(`${BASE_URL}/user/${data.google_id}`);
      const newUser = authResult?.data?.result?._doc;
      setUser(newUser);
      toast.success('🦄 Successfully signed in!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
    } catch (err) {
      console.error(err);
      toast.error('🦄 Unsuccessful login :(', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
    }
  };

  const signUp = async (data: User): Promise<void> => {
    try {
      const authResult = await axios.post(`${BASE_URL}/user`, data);
      const newUser = authResult?.data.result;
      setUser(newUser);
      toast.success('🦄 Successfully signed up!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
    } catch (error) {
      console.error(error);
      toast.error('🦄 Unsuccessfully signed up :(', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
    }
  };

  const signOut = (): void => {
    setUser(undefined);
  };

  return { user, checkIfNewUser, signIn, signUp, signOut };
};
