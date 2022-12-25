/* eslint-disable @typescript-eslint/indent */
import axios from 'axios';
import {
  GetDayResults,
  GetDayExistsProps,
  GetDayExistsResults,
  CreateDayResults,
  CreateDayProps,
  EditDayResults,
  EditDayProps,
  GetDayProps
} from '../types/useDay';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

// TODO: make all of this an actual hook
export const getDayExists = async (
  props: GetDayExistsProps
): Promise<GetDayExistsResults> => {
  const { googleId, date } = props;
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

export const getDay = async (props: GetDayProps): Promise<GetDayResults> => {
  const requestString = `${BASE_URL}/day/${String(props.dayId)}`;

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
  props: CreateDayProps
): Promise<CreateDayResults> => {
  const requestString = `${BASE_URL}/day`;

  return await axios
    .post(requestString, props)
    .then((e) => {
      return e.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const editDay = async (props: EditDayProps): Promise<EditDayResults> => {
  const requestString = `${BASE_URL}/day/${String(props._id)}`;

  return await axios
    .put(requestString, props)
    .then((e) => {
      return e.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
