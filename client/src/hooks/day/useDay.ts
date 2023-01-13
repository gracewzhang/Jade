/* eslint-disable @typescript-eslint/indent */
import { apiClient } from '../apiClient';
import {
  GetDayResults,
  GetDayExistsProps,
  GetDayExistsResults,
  CreateDayResults,
  CreateDayProps,
  EditDayResults,
  EditDayProps,
  EditDayPhotoProps,
  EditDayPhotoResults,
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
  const getDayExists = async (
    props: GetDayExistsProps
  ): Promise<GetDayExistsResults> => {
    const { googleId, date } = props;
    const requestString = `/user/${String(googleId)}/day/exists/date/${String(
      date
    )}`;

    return await apiClient
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
    const requestString = `/day/${String(props.dayId)}`;

    return await apiClient
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
    const requestString = `/user/${String(props.googleId)}/day/date/${String(
      props.day
    )}`;

    return await apiClient
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
    const requestString = '/day';

    return await apiClient
      .post(requestString, props)
      .then((e) => {
        return e.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const editDay = async (props: EditDayProps): Promise<EditDayResults> => {
    const requestString = `/day/${String(props._id)}`;

    return await apiClient
      .put(requestString, props)
      .then((e) => {
        return e.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const editDayPhoto = async (
    props: EditDayPhotoProps
  ): Promise<EditDayPhotoResults> => {
    const { _id, url, photoIdx } = props;
    const requestString = `/day/${String(_id)}/photos/${String(photoIdx)}`;

    return await apiClient
      .put(requestString, { url })
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
    const requestString = `/user/${String(props.googleId)}/day/random`;

    return await apiClient
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
    const requestString = `/user/${String(props.googleId)}/day/favorites`;

    return await apiClient
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
    editDayPhoto,
    getRandomDay,
    getFavorites
  };
};
