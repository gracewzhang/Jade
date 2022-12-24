/* eslint-disable @typescript-eslint/indent */
import axios from 'axios';
import {
  GetDayResults,
  GetDayExistsParams,
  GetDayExistsResults,
  CreateDayResults,
  CreateDayParams,
  EditDayResults,
  EditDayParams,
  GetDayParams
} from '../models/day';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

// TODO: make all of this an actual hook
export const getDayExists = async (
  dayParams: GetDayExistsParams
): Promise<GetDayExistsResults> => {
  const { googleId, date } = dayParams;
  const requestString = `${BASE_URL}/user/${String(
    googleId
  )}/day/exists/date/${String(date)}`;

  return await axios
    .get<GetDayExistsResults>(requestString, {
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
  dayParams: GetDayParams
): Promise<GetDayResults> => {
  const requestString = `${BASE_URL}/day/${String(dayParams.dayId)}`;

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

export const editDay = async (
  dayParams: EditDayParams
): Promise<EditDayResults> => {
  const requestString = `${BASE_URL}/day/${String(dayParams._id)}`;

  return await axios
    .put(requestString, dayParams)
    .then((e) => {
      return e.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
