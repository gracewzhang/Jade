import React from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';
import { Calendar as _Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarContainer = styled(Block)``;

const StyledCalendar = styled(_Calendar)`
  border: 0;
`;

const Calendar = (): React.ReactElement => {
  return (
    <CalendarContainer>
      <StyledCalendar
        calendarType="US"
        defaultValue={new Date()}
        maxDate={new Date()}
        showFixedNumberOfWeeks
      />
    </CalendarContainer>
  );
};

export default Calendar;
