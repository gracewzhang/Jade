/* eslint-disable @typescript-eslint/indent */
import axios from 'axios';
import useStore from '../../stores';
import {
  EditUserProps,
  GetNumberOfDaysProps,
  GetNumberOfDaysResults,
  GetUserProps,
  GetUserResults,
  UseUserResults
} from './types';

export const useUser = (): UseUserResults => {
  const BASE_URL =
    process.env.REACT_APP_VERCEL_URL !== undefined
      ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
      : 'http://localhost:9000/api';
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const getUser = async (props: GetUserProps): Promise<GetUserResults> => {
    const requestString = `${BASE_URL}/user/${String(props.googleId)}`;

    return await axios
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
  ): Promise<GetNumberOfDaysResults> => {
    const requestString = `${BASE_URL}/user/${String(
      props.googleId
    )}/day/count`;

    return await axios
      .get<GetNumberOfDaysResults>(requestString, {
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

  const editUser = async (props: EditUserProps): Promise<void> => {
    const { googleId, newName, newPrimaryColor, newSecondaryColor } = props;
    try {
      await axios.put(`${BASE_URL}/user/${String(googleId)}`, {
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
