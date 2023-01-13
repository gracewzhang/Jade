import React, { BaseSyntheticEvent } from 'react';
import styled from 'styled-components';
import { darken } from 'color2k';

import Block from '../../../../components/Block';
import { Calendar as _Calendar, CalendarTileProperties } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import colors from '../../../../utils/colors';
import { CalendarItemProps, CalendarProps } from './types';
import { toDate, toISO8601 } from '../../../../utils/date';
import useStore from '../../../../stores';

const CalendarContainer = styled(Block)``;

const StyledCalendar = styled(_Calendar)<CalendarItemProps>`
  border: 0;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  padding: 30px;
  padding-bottom: 40px;
  font-family: 'Ubuntu', sans-serif;

  * {
    text-decoration: none;
  }

  button {
    font-family: 'Ubuntu', sans-serif;
    border-radius: 20px;
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

  .react-calendar__year-view__months__month,
  .react-calendar__decade-view__years__year {
    height: 65px;
    padding: 10px 5px 10px 5px;
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

  // TODO: the select/hover colors are wack again T_T
  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:focus {
    background-color: ${(props) => props.secondaryColor};
    color: white;
  }

  .calendar__tile--hasActive:enabled:focus,
  .calendar__tile--hasActive:enabled:focus {
    background: ${(props) => props.secondaryColor};
  }

  .react-calendar__tile--active:enabled:focus:hover,
  .react-calendar__tile--now:enabled:focus:hover {
    background: ${(props) => props.secondaryColor};
    color: white;
  }

  .react-calendar__tile--hasActive {
    background: ${(props) => props.secondaryColor};
    color: white;
  }

  .j-${(props) => props.selectedDayClass}-month {
    background: ${(props) => props.secondaryColor};
    color: white;
  }

  .react-calendar__tile--hasActive:hover {
    background: ${(props) => props.darkSecondaryColor};
  }

  .react-calendar__tile--now:hover {
    background: ${(props) => props.darkPrimaryColor};
    color: white;
  }

  .react-calendar__tile--now {
    background: ${(props) => props.primaryColor};
    color: white;
  }

  .react-calendar__tile:disabled {
    color: ${colors['medium-grey']};
    background-color: white;
  }
`;

const Calendar = (props: CalendarProps): React.ReactElement => {
  const { date, setDate } = props;
  const user = useStore((state) => state.user);

  const handleDayChange = (value: Date, event: BaseSyntheticEvent): void => {
    setDate(toISO8601(value));
  };

  const getTileClassName = (props: CalendarTileProperties): string => {
    return `j-${toISO8601(props.date)}-${props.view}`;
  };

  return (
    <CalendarContainer>
      <StyledCalendar
        calendarType="US"
        selectedDayClass={date}
        defaultValue={toDate(date)}
        maxDate={new Date()}
        showFixedNumberOfWeeks
        onClickDay={handleDayChange}
        tileClassName={getTileClassName}
        primaryColor={user?.primary_color ?? colors.rose}
        secondaryColor={user?.secondary_color ?? colors.yellow}
        darkPrimaryColor={darken(user?.primary_color ?? colors.rose, 0.1)}
        darkSecondaryColor={darken(user?.secondary_color ?? colors.yellow, 0.1)}
      />
    </CalendarContainer>
  );
};

export default Calendar;
