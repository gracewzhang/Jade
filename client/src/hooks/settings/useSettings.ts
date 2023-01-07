import axios from 'axios';
import { useState } from 'react';
import {
  ChangeNameProps,
  ChangePrimaryColorProps,
  ChangeSecondaryColorProps,
  UseSettingsResults
} from './types';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

export const useSettings = (): UseSettingsResults => {
  const [name, setName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');

  const handleChangeName = async (props: ChangeNameProps): Promise<void> => {
    const { googleId, name } = props;
    try {
      await axios.put(`${BASE_URL}/user/${String(googleId)}`, { name });
      setName(name);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePrimaryColor = async (
    props: ChangePrimaryColorProps
  ): Promise<void> => {
    const { googleId, primaryColor } = props;
    try {
      await axios.put(`${BASE_URL}/user/${String(googleId)}`, {
        primary_color: primaryColor
      });
      setPrimaryColor(primaryColor);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeSecondaryColor = async (
    props: ChangeSecondaryColorProps
  ): Promise<void> => {
    const { googleId, secondaryColor } = props;
    try {
      await axios.put(`${BASE_URL}/user/${String(googleId)}`, {
        secondary_color: secondaryColor
      });
      setSecondaryColor(secondaryColor);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    name,
    handleChangeName,
    primaryColor,
    handleChangePrimaryColor,
    secondaryColor,
    handleChangeSecondaryColor
  };
};
