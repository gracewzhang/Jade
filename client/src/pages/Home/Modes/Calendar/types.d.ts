export interface CalendarProps {
  setDate: (newDate: Date) => void;
  date: Date;
}

export interface CalendarItemProps {
  selectedDayClass: string;
}
