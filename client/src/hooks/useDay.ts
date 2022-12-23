/* eslint-disable @typescript-eslint/indent */
import axios from 'axios';
import { GetDaysResults, GetDayResults } from '../models/day';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

// TODO: make all of this an actual hook
export const getDays = async (): Promise<GetDaysResults> => {
  const requestString = `${BASE_URL}/day/`;
  return await axios
    .get<GetDaysResults>(requestString, {
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

export const getDay = async (
  googleId: string,
  date: string
): Promise<GetDayResults> => {
  const requestString = `${BASE_URL}/user/${googleId}/day/date/${date}`;

  return await axios
    .get<GetDayResults>(requestString, {
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
