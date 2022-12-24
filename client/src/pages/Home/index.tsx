import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Welcome from './Welcome';
import Photos from './Photos';
import Entry from './Entry';
import SongFood from './SongFood';
import Calendar from './Calendar';
import Thoughts from './Thoughts';
import { useAuthContext } from '../../contexts/AuthContext';
import { createDay, getDay, getDayExists } from '../../hooks/useDay';
import { Day } from '../../models/day';

const HomeContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  padding-top: 5%;
  padding-left: 7%;
  padding-right: 9%;
  padding-bottom: 5%;
`;

const ContentContainer = styled.span`
  display: grid;
  grid-template-columns: 65% 35%;
`;

const LeftContentContainer = styled.div`
  display: grid;
  grid-template-rows: 45% 55%;
`;

const PhotosContainer = styled.div`
  padding: 40px;
  padding-top: 60px;
  padding-left: 0;
`;

const BottomContentContainer = styled.span`
  display: grid;
  grid-template-columns: 60% 40%;
`;

const EntryContainer = styled.div`
  padding-top: 40px;
`;

const BottomRightContentContainer = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  padding-left: 80px;
  padding-right: 40px;
`;

const SongFoodContainer = styled.div`
  padding-top: 40px;
`;

const RightContentContainer = styled.div`
  display: grid;
  grid-template-rows: 70% 30%;
`;

const CalendarContainer = styled.div`
  padding-bottom: 40px;
  padding-left: 40px;
`;

const ThoughtsContainer = styled.div`
  padding-left: 40px;
`;

const formatDate = (date: Date): string => {
  let newDate = date;
  const offset = newDate.getTimezoneOffset();
  newDate = new Date(newDate.getTime() - offset * 60 * 1000);
  return newDate.toISOString().split('T')[0];
};

// TODO: use a ref for the day/date to keep everything from re-rendering?
const Home = (): React.ReactElement => {
  // TODO: const [user, setUser] = useLocalStorage("user", null);
  const { user } = useAuthContext();
  const [day, setDay] = useState<Day>(); // TODO: change the other instances of setting default state to <Type> syntax
  const [date, setDate] = useState(new Date());

  const calendarProps = { setDate };

  const retrieveDay = useCallback(async () => {
    const res = await getDayExists(user.google_id, formatDate(date));
    if (typeof res.result === 'boolean') {
      const dayParams = { google_id: user.google_id, date: formatDate(date) };
      const newDay = await createDay(dayParams);
      setDay(newDay.result);
    } else {
      const dayId = res.result._id;
      const day = await getDay(dayId);
      setDay(day.result);
    }
  }, [date]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    retrieveDay();
  }, [retrieveDay]);

  useEffect(() => {
    console.log(day);
  }, [day]);

  return (
    <HomeContainer>
      <Welcome />
      <ContentContainer>
        <LeftContentContainer>
          <PhotosContainer>
            <Photos />
          </PhotosContainer>
          <BottomContentContainer>
            <EntryContainer>
              <Entry />
            </EntryContainer>
            <BottomRightContentContainer>
              <SongFoodContainer>
                <SongFood />
              </SongFoodContainer>
              <SongFoodContainer>
                <SongFood />
              </SongFoodContainer>
            </BottomRightContentContainer>
          </BottomContentContainer>
        </LeftContentContainer>
        <RightContentContainer>
          <CalendarContainer>
            <Calendar {...calendarProps} />
          </CalendarContainer>
          <ThoughtsContainer>
            <Thoughts />
          </ThoughtsContainer>
        </RightContentContainer>
      </ContentContainer>
    </HomeContainer>
  );
};

export default Home;
