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
  }
`;

const StyledCalendarIcon = styled(HiOutlineCalendar)`
  width: 22px;
  height: 22px;

  :hover {
    cursor: pointer;
  }
`;

const IconBar = (props: IconBarProps): JSX.Element => {
  const { mode, setMode } = props;
  return (
    <IconsContainer>
      <StyledClockIcon
        color={mode === CalendarMode.history ? 'black' : colors['light-grey']}
        onClick={() => setMode(CalendarMode.history)}
      />
      <StyledHeartIcon
        color={mode === CalendarMode.favorites ? 'black' : colors['light-grey']}
        onClick={() => setMode(CalendarMode.favorites)}
      />
      <StyledDiceIcon
        color={mode === CalendarMode.calendar ? 'black' : colors['light-grey']}
      />
      <StyledCalendarIcon
        color={mode === CalendarMode.calendar ? 'black' : colors['light-grey']}
        onClick={() => setMode(CalendarMode.calendar)}
      />
    </IconsContainer>
  );
};

export default IconBar;
