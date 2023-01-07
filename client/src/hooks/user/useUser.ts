/* eslint-disable @typescript-eslint/indent */
import axios from 'axios';
import {
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

  return {
    getUser,
    getNumberOfDays
  };
};
