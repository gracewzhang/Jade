import { PastDay } from '../../pages/Home/Modes/OnThisDay/types';
import { Day } from '../../types/day';

export interface DayItemProps {
  setDate: (newDate: string) => void;
  day: Day | PastDay;
  selected: boolean;
  icon: StyledComponent<IconType, any, {}, never>;
}

export interface DayItemContainerProps {
  selected: boolean;
  primaryColor: string;
}
