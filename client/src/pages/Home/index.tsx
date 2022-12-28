import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Welcome from './Welcome';
import Photos from './Photos';
import Entry from './Entry';
import SongFood from './SongFood';
import Calendar from './Calendar';
import Thoughts from './Thoughts';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import { useDay } from '../../hooks/day/useDay';
import { Day } from '../../types/day';
import { UpdateDayProps } from './types';
import { SF } from '../../utils/enums';
import colors from '../../utils/colors';

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 50vw 28vw;
  padding-left: 7vw;
  padding-right: 7vw;
  padding-top: 7vh;
  padding-bottom: 9vh;
  height: 84vh;
`;

const LeftContentContainer = styled.div`
  display: grid;
  grid-template-rows: 13vh 26vh 45vh;
`;

const PhotosContainer = styled.div`
  padding: 0;
`;

const BottomContentContainer = styled.span`
  display: grid;
  grid-template-columns: 35vw 15vw;
`;

const EntryContainer = styled.div`
  padding-top: 8vh;
  padding-right: 5vw;
`;

const BottomRightContentContainer = styled.div`
  max-height: 45vh;
  display: grid;
  grid-template-rows: 50% 50%;
  padding: 0;
`;

const SongFoodContainer = styled.div`
  padding-top: 7vh;
`;

const RightContentContainer = styled.div`
  display: grid;
  grid-template-rows: 65% 30%;
`;

const CalendarContainer = styled.div`
  // TODO: condense into 1 line
  padding: 20%;
  padding-right: 0;
  padding-bottom: 15%;
`;

const ThoughtsContainer = styled.div`
  padding-left: 20%;
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
  const { getDayExists, getDay, createDay, editDay } = useDay();
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

  const updateDay = async (updateParams: UpdateDayProps): Promise<void> => {
    if (day !== undefined) {
      const res = await editDay({ _id: day._id, ...updateParams });
      setDay(res.result);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    retrieveDay();
  }, [retrieveDay]);

  const loading = day === undefined || day.date !== formatDate(date);

  return (
    <SkeletonTheme baseColor={colors['super-light-grey']} borderRadius="30px">
      <HomeContainer>
        <LeftContentContainer>
          <Welcome />
          <PhotosContainer>
            {loading ? <Skeleton count={9} /> : <Photos />}
          </PhotosContainer>
          <BottomContentContainer>
            <EntryContainer>
              {loading ? (
                <Skeleton count={16} />
              ) : (
                <Entry
                  updateDay={updateDay}
                  key={formatDate(date)}
                  title={day.title}
                  entry={day.entry}
                />
              )}
            </EntryContainer>
            <BottomRightContentContainer>
              <SongFoodContainer>
                {loading ? (
                  <Skeleton count={7} />
                ) : (
                  <SongFood
                    type={SF.song}
                    key={formatDate(date)}
                    song={day.song}
                    updateDay={updateDay}
                  />
                )}
              </SongFoodContainer>
              <SongFoodContainer>
                {loading ? (
                  <Skeleton count={7} />
                ) : (
                  <SongFood
                    type={SF.food}
                    key={formatDate(date)}
                    food={day.food}
                    updateDay={updateDay}
                  />
                )}
              </SongFoodContainer>
            </BottomRightContentContainer>
          </BottomContentContainer>
        </LeftContentContainer>
        <RightContentContainer>
          <CalendarContainer>
            <Calendar date={date} setDate={setDate} />
          </CalendarContainer>
          <ThoughtsContainer>
            {loading ? (
              <Skeleton count={10} />
            ) : (
              <Thoughts
                key={formatDate(date)}
                thoughts={day.thoughts}
                updateDay={updateDay}
              />
            )}
          </ThoughtsContainer>
        </RightContentContainer>
      </HomeContainer>
    </SkeletonTheme>
  );
};

export default Home;
