import React from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';
import { Calendar as _Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import colors from '../../../styles/colors';
import { CalendarProps } from '../../../models/calendar';

const CalendarContainer = styled(Block)``;

const StyledCalendar = styled(_Calendar)`
  border: 0;
  border-radius: 30px;
  width: 100%;
  height: 100%;
  padding: 30px;
  font-family: 'Ubuntu', sans-serif;

  * {
    text-decoration: none;
  }

  button {
    font-family: 'Ubuntu', sans-serif;
    border-radius: 30px;
  }

  .react-calendar__navigation {
    height: 10%;
    margin-bottom: 5%;
  }

  .react-calendar__navigation__label__labelText {
    font-weight: bold;
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

  .react-calendar__navigation__label:hover,
  .react-calendar__navigation__arrow:hover {
    color: white;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${colors['medium-grey']};
  }

  .react-calendar__navigation button:disabled {
    color: ${colors['medium-grey']};
    background-color: white;
  }

  .react-calendar__tile:hover {
    background: ${colors['light-grey']};
    color: white;
  }

  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:focus {
    background-color: ${colors['light-yellow']};
    color: white;
  }

  .react-calendar__tile--active:enabled:focus:hover,
  .react-calendar__tile--now:enabled:focus:hover {
    background: ${colors.yellow};
    color: white;
  }

  .react-calendar__tile--hasActive {
    background: ${colors['light-yellow']};
    color: white;
  }

  .react-calendar__tile--hasActive:hover {
    background: ${colors.yellow};
  }

  .react-calendar__tile--now:hover {
    background: ${colors['dark-rose']};
    color: white;
  }

  .react-calendar__tile--now {
    background: ${colors.rose};
    color: white;
  }

  .react-calendar__tile:disabled {
    color: ${colors['medium-grey']};
    background-color: white;
  }
`;

const Calendar = (props: CalendarProps): React.ReactElement => {
  const { setDate } = props;

  const handleDayChange = (value: Date, event: any): void => {
    setDate(value);
  };

  return (
    <CalendarContainer>
      <StyledCalendar
        calendarType="US"
        defaultValue={props.date}
        maxDate={new Date()}
        showFixedNumberOfWeeks
        onClickDay={handleDayChange}
      />
    </CalendarContainer>
  );
};

export default Calendar;
