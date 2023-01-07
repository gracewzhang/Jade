export interface SettingsContextProps {
  name: string;
  handleChangeName: (props: ChangeNameProps) => Promise<void>;
  primaryColor: string;
  handleChangePrimaryColor: (props: ChangePrimaryColorProps) => Promise<void>;
  secondaryColor: string;
  handleChangeSecondaryColor: (
    props: ChangeSecondaryColorProps
  ) => Promise<void>;
}
