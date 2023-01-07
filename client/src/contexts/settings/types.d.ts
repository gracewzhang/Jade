export interface SettingsContextProps {
  name: string;
  setName: (newName: string) => void;
  primaryColor: string;
  setPrimaryColor: (newPrimaryColor: string) => void;
  secondaryColor: string;
  setSecondaryColor: (newSecondaryColor: string) => void;
}
