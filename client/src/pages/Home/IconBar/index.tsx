import React from 'react';
import styled from 'styled-components';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineHeart
} from 'react-icons/hi2';
import { CgDice3 } from 'react-icons/cg';

import colors from '../../../utils/colors';
import { CalendarMode } from '../../../utils/enums';
import { IconBarProps } from './types';
import { useDay } from '../../../hooks/day/useDay';
import { toDate } from '../../../utils/date';
import useStore from '../../../stores';

const IconsContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  svg {
    margin-left: 15px;
  }
`;

const StyledClockIcon = styled(HiOutlineClock)`
  width: 22px;
  height: 22px;

  :hover {
    cursor: pointer;
  }
`;

const StyledHeartIcon = styled(HiOutlineHeart)`
  width: 22px;
  height: 22px;

  :hover {
    cursor: pointer;
  }
`;

const StyledDiceIcon = styled(CgDice3)`
  width: 19px;
  height: 23px;

  :hover {
    cursor: pointer;
    color: black !important;
  }
`;

const StyledCalendarIcon = styled(HiOutlineCalendar)`
  width: 22px;
  height: 22px;

  :hover {
    cursor: pointer;
  }
`;

const IconBar = (props: IconBarProps): React.ReactElement => {
  const { mode, setMode, setDate } = props;
  const user = useStore((state) => state.user);
  const { getRandomDay } = useDay();

  const handleGetRandomDay = async (): Promise<void> => {
    if (user !== undefined) {
      const res = await getRandomDay({ googleId: user.google_id });
      if (res.result.length === 1) {
        const day = res.result[0];
        setDate(toDate(day.date));
      }
    }
  };

  return (
    <IconsContainer>
      <StyledClockIcon
        color={mode === CalendarMode.onThisDay ? 'black' : colors['light-grey']}
        onClick={() => setMode(CalendarMode.onThisDay)}
      />
      <StyledHeartIcon
        color={mode === CalendarMode.favorites ? 'black' : colors['light-grey']}
        onClick={() => setMode(CalendarMode.favorites)}
      />
      {mode === CalendarMode.calendar && (
        <StyledDiceIcon
          color={colors['light-grey']}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleGetRandomDay}
        />
      )}
      <StyledCalendarIcon
        color={mode === CalendarMode.calendar ? 'black' : colors['light-grey']}
        onClick={() => setMode(CalendarMode.calendar)}
      />
    </IconsContainer>
  );
};

export default IconBar;
