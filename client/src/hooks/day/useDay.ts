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
  GetDayProps,
  GetFavoritesProps,
  GetFavoritesResults,
  UseDayResults,
  GetDaysDayProps,
  GetDaysDayResults,
  GetRandomDayProps,
  GetRandomDayResults
} from './types';

export const useDay = (): UseDayResults => {
  const BASE_URL =
    process.env.REACT_APP_VERCEL_URL !== undefined
      ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
      : 'http://localhost:9000/api';

  const getDayExists = async (
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

  const getDay = async (props: GetDayProps): Promise<GetDayResults> => {
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

  const getDaysDay = async (
    props: GetDaysDayProps
  ): Promise<GetDaysDayResults> => {
    const requestString = `${BASE_URL}/user/${String(
      props.googleId
    )}/day/date/${String(props.day)}`;

    return await axios
      .get<GetDaysDayResults>(requestString, {
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

  const createDay = async (
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

  const editDay = async (props: EditDayProps): Promise<EditDayResults> => {
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

  const getRandomDay = async (
    props: GetRandomDayProps
  ): Promise<GetRandomDayResults> => {
    const requestString = `${BASE_URL}/user/${String(
      props.googleId
    )}/day/random`;

    return await axios
      .get<GetRandomDayResults>(requestString, {
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

  const getFavorites = async (
    props: GetFavoritesProps
  ): Promise<GetFavoritesResults> => {
    const requestString = `${BASE_URL}/user/${String(
      props.googleId
    )}/day/favorites`;

    return await axios
      .get<GetFavoritesResults>(requestString, {
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
    getDayExists,
    getDay,
    getDaysDay,
    createDay,
    editDay,
    getRandomDay,
    getFavorites
  };
};
