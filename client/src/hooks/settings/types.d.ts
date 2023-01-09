export interface UseSettingsResults {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  updateSettings: (props: UpdateSettingsProps) => Promise<void>;
}

export interface UpdateSettingsProps {
  googleId: string;
  newName: string;
  newPrimaryColor: string;
  newSecondaryColor: string;
}
