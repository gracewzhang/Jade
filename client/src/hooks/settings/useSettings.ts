import axios from 'axios';
import { useState } from 'react';
import { UpdateSettingsProps, UseSettingsResults } from './types';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

export const useSettings = (): UseSettingsResults => {
  const [name, setName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');

  const updateSettings = async (props: UpdateSettingsProps): Promise<void> => {
    const { googleId, newName, newPrimaryColor, newSecondaryColor } = props;
    try {
      await axios.put(`${BASE_URL}/user/${String(googleId)}`, {
        name: newName,
        primary_color: newPrimaryColor,
        secondary_color: newSecondaryColor
      });
      setName(newName);
      setPrimaryColor(newPrimaryColor);
      setSecondaryColor(newSecondaryColor);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    name,
    primaryColor,
    secondaryColor,
    updateSettings
  };
};
