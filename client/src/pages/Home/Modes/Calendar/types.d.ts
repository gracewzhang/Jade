export interface CalendarProps {
  setDate: (newDate: string) => void;
  date: string;
}

export interface CalendarItemProps {
  selectedDayClass: string;
  primaryColor: string;
  darkPrimaryColor: string;
  secondaryColor: string;
  darkSecondaryColor: string;
}
