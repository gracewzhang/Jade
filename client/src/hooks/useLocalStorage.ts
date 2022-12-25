import { useState, useEffect } from 'react';
import { User } from '../models/user';

const getStorageValue = (
  key: string,
  defaultValue: undefined | User
): undefined | User => {
  const saved = localStorage.getItem(key);
  if (saved != null) {
    const initial = JSON.parse(saved);
    return initial ?? defaultValue;
  }
  return defaultValue;
};

export const useLocalStorage = (
  key: string,
  defaultValue: undefined | User
): [
  undefined | User,
  React.Dispatch<React.SetStateAction<User | undefined>>
] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
