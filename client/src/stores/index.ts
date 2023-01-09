import axios from 'axios';
import { toast } from 'react-toastify';
import create from 'zustand';
import { AuthUser } from '../types/user';
import { StoreResults, UpdateUserProps } from './types';

// TODO: extract BASE_URL
const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

const useStore = create<StoreResults>()((set, get) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  checkIfNewUser: async (googleId: string): Promise<boolean> => {
    try {
      const authResult = await axios.get(`${BASE_URL}/user/exists/${googleId}`);
      return authResult?.data.result === false;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  // TODO: can we check for local storage here?
  signIn: async (data: AuthUser): Promise<void> => {
    try {
      const authResult = await axios.get(
        `${BASE_URL}/user/${String(data.google_id)}`
      );
      const newUser = authResult?.data?.result;
      set({ user: newUser });
      // TODO: can I extract all of these toasts?
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
  },
  signUp: async (data: AuthUser): Promise<void> => {
    try {
      const authResult = await axios.post(`${BASE_URL}/user`, data);
      const newUser = authResult?.data.result;
      set({ user: newUser });
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
  },
  signOut: (): void => {
    set({ user: undefined });
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
  },
  updateUser: async (props: UpdateUserProps) => {
    const { googleId, newName, newPrimaryColor, newSecondaryColor } = props;
    try {
      await axios.put(`${BASE_URL}/user/${String(googleId)}`, {
        name: newName,
        primary_color: newPrimaryColor,
        secondary_color: newSecondaryColor
      });
      const newUser = get().user;
      if (newUser !== undefined) {
        newUser.name = newName;
        newUser.primary_color = newPrimaryColor;
        newUser.secondary_color = newSecondaryColor;
        set({ user: newUser });
      }
      // TODO: update local storage
    } catch (err) {
      console.log(err);
    }
  }
}));

export default useStore;
