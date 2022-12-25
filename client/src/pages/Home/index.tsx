import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Welcome from './Welcome';
import Photos from './Photos';
import Entry from './Entry';
import SongFood from './SongFood';
import Calendar from './Calendar';
import Thoughts from './Thoughts';
import { useAuthContext } from '../../contexts/AuthContext';
import { createDay, getDay, getDayExists, editDay } from '../../hooks/useDay';
import { Day, UpdateDayParams } from '../../models/day';

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

const Home = (): React.ReactElement => {
  // TODO: const [user, setUser] = useLocalStorage("user", undefined);
  const { user } = useAuthContext();
  const [day, setDay] = useState<Day>();
  const [date, setDate] = useState(new Date());

  const retrieveDay = useCallback(async () => {
    if (user !== undefined) {
      const existsParams = { googleId: user.google_id, date: formatDate(date) };
      const res = await getDayExists(existsParams);
      if (typeof res.result === 'boolean') {
        const dayParams = { google_id: user.google_id, date: formatDate(date) };
        const newDay = await createDay(dayParams);
        setDay(newDay.result);
      } else {
        const dayId = res.result._id;
        const day = await getDay({ dayId });
        setDay(day.result);
      }
    }
  }, [date]);

  const updateDay = async (updateParams: UpdateDayParams): Promise<void> => {
    if (day !== undefined) {
      const res = await editDay({ _id: day._id, ...updateParams });
      setDay(res.result);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    retrieveDay();
  }, [retrieveDay]);

  return (
    <HomeContainer>
      <Welcome />
      {/* TODO: loading skeleton while day is undefined */}
      {day !== undefined && day.date === formatDate(date) ? (
        <ContentContainer>
          <LeftContentContainer>
            <PhotosContainer>
              <Photos />
            </PhotosContainer>
            <BottomContentContainer>
              <EntryContainer>
                <Entry
                  updateDay={updateDay}
                  key={formatDate(date)}
                  title={day.title}
                  entry={day.entry}
                />
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
              <Calendar date={date} setDate={setDate} />
            </CalendarContainer>
            <ThoughtsContainer>
              <Thoughts />
            </ThoughtsContainer>
          </RightContentContainer>
        </ContentContainer>
      ) : (
        <p>hi</p> // TODO
      )}
    </HomeContainer>
  );
};

export default Home;
