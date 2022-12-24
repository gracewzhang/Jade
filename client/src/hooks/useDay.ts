/* eslint-disable @typescript-eslint/indent */
import axios from 'axios';
import {
  GetDaysResults,
  GetDayResults,
  DayExistsResults,
  CreateDayResults,
  CreateDayParams
} from '../models/day';

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

export const getDayExists = async (
  googleId: string,
  date: string
): Promise<DayExistsResults> => {
  const requestString = `${BASE_URL}/user/${googleId}/day/exists/date/${date}`;

  return await axios
    .get<DayExistsResults>(requestString, {
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

export const getDay = async (dayId: string): Promise<GetDayResults> => {
  const requestString = `${BASE_URL}/day/${dayId}`;

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

export const createDay = async (
  dayParams: CreateDayParams
): Promise<CreateDayResults> => {
  const requestString = `${BASE_URL}/day`;

  return await axios
    .post(requestString, dayParams)
    .then((e) => {
      return e.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
