import { Day } from '../../../../types/day';

export interface OnThisDayProps {
  date: string;
  setDate: (newDate: Date) => void;
}

export interface PsatDayProps {
  setDate: (newDate: Date) => void;
  day: Day;
  selected: boolean;
}

export interface PastDayContainerProps {
  selected: boolean;
}
