import axios from 'axios';
import useStore from '../../stores';
import { AuthUser } from '../../types/user';
import { toastError, toastSuccess } from '../../utils/toast';
import { UseAuthResults } from './types';

export const useAuth = (): UseAuthResults => {
  const BASE_URL =
    process.env.REACT_APP_VERCEL_URL !== undefined
      ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
      : 'http://localhost:9000/api';

  const setUser = useStore((state) => state.setUser);

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
      toastSuccess('Successfully signed in!');
    } catch (err) {
      console.error(err);
      toastError('Unsuccessfully signed in :(');
    }
  };

  const signUp = async (data: AuthUser): Promise<void> => {
    try {
      const authResult = await axios.post(`${BASE_URL}/user`, data);
      const newUser = authResult?.data.result;
      setUser(newUser);
      toastSuccess('Successfully signed up!');
    } catch (error) {
      console.error(error);
      toastError('Unsuccessfully signed up :(');
    }
  };

  const signOut = (): void => {
    setUser(undefined);
    toastSuccess('Successfully signed out!');
  };

  return { checkIfNewUser, signIn, signOut, signUp };
};
