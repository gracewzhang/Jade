export interface UseSettingsResults {
  name: string;
  handleChangeName: (props: ChangeNameProps) => Promise<void>;
  primaryColor: string;
  handleChangePrimaryColor: (props: ChangePrimaryColorProps) => Promise<void>;
  secondaryColor: string;
  handleChangeSecondaryColor: (
    props: ChangeSecondaryColorProps
  ) => Promise<void>;
}

export interface ChangeNameProps {
  googleId: string;
  name: string;
}

export interface ChangePrimaryColorProps {
  googleId: string;
  primaryColor: string;
}

export interface ChangeSecondaryColorProps {
  googleId: string;
  secondaryColor: string;
}
