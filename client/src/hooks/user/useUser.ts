/* eslint-disable @typescript-eslint/indent */
import useStore from '../../stores';
import { apiClient } from '../axios';
import {
  EditUserProps,
  GetNumberOfDaysProps,
  GetNumberOfDaysResults,
  GetUserProps,
  GetUserResults,
  UseUserResults
} from './types';

export const useUser = (): UseUserResults => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const getUser = async (props: GetUserProps): Promise<GetUserResults> => {
    const requestString = `/user/${String(props.googleId)}`;

    return await apiClient
      .get<GetUserResults>(requestString, {
        headers: {
          'Content-Type': 'application/JSON'
        }
      })
      .then((e) => {
        return e.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const getNumberOfDays = async (
    props: GetNumberOfDaysProps
  ): Promise<number> => {
    const requestString = `/user/${String(props.googleId)}/day/count`;

    return await apiClient
      .get<GetNumberOfDaysResults>(requestString, {
        headers: {
          'Content-Type': 'application/JSON'
        }
      })
      .then((e) => {
        return e.data.result ?? 0;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const editUser = async (props: EditUserProps): Promise<void> => {
    const { googleId, newName, newPrimaryColor, newSecondaryColor } = props;
    try {
      await apiClient.put(`/user/${String(googleId)}`, {
        name: newName,
        primary_color: newPrimaryColor,
        secondary_color: newSecondaryColor
      });

      const oldUser = user;
      if (oldUser !== undefined) {
        const newUser = { ...oldUser };
        newUser.name = newName;
        newUser.primary_color = newPrimaryColor;
        newUser.secondary_color = newSecondaryColor;

        setUser(newUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getUser,
    getNumberOfDays,
    editUser
  };
};
