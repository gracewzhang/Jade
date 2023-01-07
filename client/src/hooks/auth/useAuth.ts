import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AuthUser, User } from '../../types/user';
import { UseAuthResults } from './types';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

export const useAuth = (): UseAuthResults => {
  const [user, setUser] = useState<User>();

  const checkIfNewUser = async (googleId: string): Promise<boolean> => {
    try {
      const authResult = await axios.get(`${BASE_URL}/user/exists/${googleId}`);
      return authResult?.data.result === false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const signIn = async (data: AuthUser): Promise<void> => {
    try {
      const authResult = await axios.get(
        `${BASE_URL}/user/${String(data.google_id)}`
      );
      const newUser = authResult?.data?.result;
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

  const signUp = async (data: AuthUser): Promise<void> => {
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
    localStorage.setItem('user', 'undefined');

    toast.success('🦄 Successfully signed out!', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    });
  };

  return { user, setUser, checkIfNewUser, signIn, signUp, signOut };
};
