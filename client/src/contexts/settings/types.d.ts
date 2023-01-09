export interface SettingsContextProps {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  updateSettings: (props: UpdateSettingsProps) => Promise<void>;
}
