export interface CalendarProps {
  setDate: (newDate: Date) => void;
  date: Date;
}

export interface CalendarItemProps {
  selectedDayClass: string;
  primaryColor: string;
  darkPrimaryColor: string;
  secondaryColor: string;
  darkSecondaryColor: string;
}
