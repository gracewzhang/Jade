import React, { createContext, PropsWithChildren, useContext } from 'react';
import { useSettings } from '../../hooks/settings/useSettings';
import colors from '../../utils/colors';
import { SettingsContextProps } from './types';

const SettingsContext = createContext<SettingsContextProps>({
  name: '',
  setName: (newName: string) => {},
  primaryColor: colors.rose,
  setPrimaryColor: (newPrimaryColor: string) => {},
  secondaryColor: colors['light-yellow'],
  setSecondaryColor: (newSecondaryColor: string) => {}
});

const useSettingsContext = (): SettingsContextProps =>
  useContext(SettingsContext);

const SettingsProvider = (props: PropsWithChildren): JSX.Element => {
  const settings = useSettings();
  const { children } = props;
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export { useSettingsContext, SettingsProvider };
