import React, { createContext, PropsWithChildren, useContext } from 'react';
import { UpdateSettingsProps } from '../../hooks/settings/types';
import { useSettings } from '../../hooks/settings/useSettings';
import colors from '../../utils/colors';
import { SettingsContextProps } from './types';

const SettingsContext = createContext<SettingsContextProps>({
  name: '',
  primaryColor: colors.rose,
  secondaryColor: colors['light-yellow'],
  updateSettings: async (props: UpdateSettingsProps) => {}
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
