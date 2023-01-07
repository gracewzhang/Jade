import React, { createContext, PropsWithChildren, useContext } from 'react';
import {
  ChangeNameProps,
  ChangePrimaryColorProps,
  ChangeSecondaryColorProps
} from '../../hooks/settings/types';
import { useSettings } from '../../hooks/settings/useSettings';
import colors from '../../utils/colors';
import { SettingsContextProps } from './types';

const SettingsContext = createContext<SettingsContextProps>({
  name: '',
  handleChangeName: async (props: ChangeNameProps) => {},
  primaryColor: colors.rose,
  handleChangePrimaryColor: async (props: ChangePrimaryColorProps) => {},
  secondaryColor: colors['light-yellow'],
  handleChangeSecondaryColor: async (props: ChangeSecondaryColorProps) => {}
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
