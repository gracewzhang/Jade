import axios from 'axios';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser } from '../types/user';
import { toastError, toastSuccess } from '../utils/toast';
import { StoreResults, UpdateUserProps } from './types';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

const useStore = create<StoreResults>()(
  persist(
    (set, get) => ({
      user: undefined,
      setUser: (user) => set({ user }),
      checkIfNewUser: async (googleId: string): Promise<boolean> => {
        try {
          const authResult = await axios.get(
            `${BASE_URL}/user/exists/${googleId}`
          );
          return authResult?.data.result === false;
        } catch (err) {
          console.log(err);
          return false;
        }
      },
      signIn: async (data: AuthUser): Promise<void> => {
        try {
          const authResult = await axios.get(
            `${BASE_URL}/user/${String(data.google_id)}`
          );
          const newUser = authResult?.data?.result;
          set({ user: newUser });
          toastSuccess('Successfully signed in!');
        } catch (err) {
          console.error(err);
          toastError('Unsuccessfully signed in :(');
        }
      },
      signUp: async (data: AuthUser): Promise<void> => {
        try {
          const authResult = await axios.post(`${BASE_URL}/user`, data);
          const newUser = authResult?.data.result;
          set({ user: newUser });
          toastSuccess('Successfully signed up!');
        } catch (error) {
          console.error(error);
          toastError('Unsuccessfully signed up :(');
        }
      },
      signOut: (): void => {
        set({ user: undefined });
        localStorage.setItem('user', 'undefined');
        toastSuccess('Successfully signed out!');
      },
      updateUser: async (props: UpdateUserProps) => {
        const { googleId, newName, newPrimaryColor, newSecondaryColor } = props;
        try {
          await axios.put(`${BASE_URL}/user/${String(googleId)}`, {
            name: newName,
            primary_color: newPrimaryColor,
            secondary_color: newSecondaryColor
          });

          const oldUser = get().user;
          if (oldUser !== undefined) {
            const newUser = { ...oldUser };
            newUser.name = newName;
            newUser.primary_color = newPrimaryColor;
            newUser.secondary_color = newSecondaryColor;

            set({ user: newUser });
            localStorage.setItem('user', JSON.stringify(newUser));
          }
        } catch (err) {
          console.log(err);
        }
      }
    }),
    { name: 'user-storage' }
  )
);

export default useStore;
