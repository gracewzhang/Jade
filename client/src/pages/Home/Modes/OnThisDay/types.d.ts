export interface OnThisDayProps {
  date: string;
  setDate: (newDate: Date) => void;
}

export interface PastDayContainerProps {
  selected: boolean;
}
