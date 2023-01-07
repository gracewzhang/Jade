import { useState, useEffect } from 'react';
import { User } from '../../types/user';

const getStorageValue = (
  key: string,
  defaultValue: undefined | User
): undefined | User => {
  const saved = localStorage.getItem(key);
  if (saved !== null && saved !== 'undefined') {
    const initial = JSON.parse(saved);
    return initial ?? defaultValue;
  }
  return defaultValue;
};

export const useLocalStorage = (
  key: string,
  defaultValue: undefined | User
): [undefined | User, (newUser: User | undefined) => void] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
