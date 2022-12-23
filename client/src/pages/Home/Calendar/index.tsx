import React from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';
import { Calendar as _Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import colors from '../../../styles/colors';

const CalendarContainer = styled(Block)``;

const StyledCalendar = styled(_Calendar)`
  border: 0;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  padding: 30px;
  font-family: 'Ubuntu', sans-serif;

  .react-calendar__tile {
    border-radius: 30px;
  }

  button {
    font-family: 'Ubuntu', sans-serif;
  }

  .react-calendar__navigation {
    height: 10%;
    margin-bottom: 5%;
  }

  .react-calendar__viewContainer {
    height: 90%;
  }

  .react-calendar__month-view {
    height: 100%;

    > div {
      height: 100%;

      > div {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    }
  }

  .react-calendar__month-view__days {
    height: 100%;
  }

  .react-calendar__month-view__days__day--weekend {
    color: black;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: grey; // TODO
  }

  .react-calendar__navigation button {
    border-radius: 30px;
  }

  .react-calendar__tile:disabled {
    color: lightgrey; // TODO
    background-color: white; // TODO
  }

  .react-calendar__navigation button:disabled {
    color: lightgrey;
    background-color: white;
  }

  .react-calendar__tile--active {
    background-color: ${colors.rose};
    background: ${colors.rose};
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${colors.rose};
    color: white;
  }

  .react-calendar__tile--now:hover {
    background: lavender;
    color: white;
  }

  .react-calendar__tile--now {
    background: skyblue;
    color: white;
  }
`;

const handleDayChange = (value: any, event: any): void => {};

const Calendar = (): React.ReactElement => {
  return (
    <CalendarContainer>
      <StyledCalendar
        calendarType="US"
        defaultValue={new Date()}
        maxDate={new Date()}
        showFixedNumberOfWeeks
        onClickDay={handleDayChange}
      />
    </CalendarContainer>
  );
};

export default Calendar;
