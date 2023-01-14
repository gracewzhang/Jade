import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Welcome from './Welcome';
import Photos from './Photos';
import Entry from './Entry';
import SongFood from './SongFood';
import Calendar from './Modes/Calendar';
import Thoughts from './Thoughts';
import { useDay } from '../../hooks/day/useDay';
import { Day } from '../../types/day';
import { UpdateDayProps } from './types';
import { CalendarMode, SF } from '../../utils/enums';
import IconBar from './IconBar';
import Favorites from './Modes/Favorites';
import OnThisDay from './Modes/OnThisDay';
import { toISO8601 } from '../../utils/date';
import useStore from '../../stores';

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 7vh 7vw 9vh 7vw;
  height: 84vh;
`;

const LeftContentContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 3.5fr;
`;

const PhotosContainer = styled.div`
  width: 100%;
  min-width: 100%;
  padding: 0;
`;

const BottomContentContainer = styled.span`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  max-width: 100%;
`;

const EntryContainer = styled.div`
  padding-top: 8vh;
  padding-right: 5vw;
`;

const BottomRightContentContainer = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  max-height: 45vh;
  max-width: 100%;
`;

const SongFoodContainer = styled.div`
  width: 100%;
  padding-top: 7vh;
`;

const RightContentContainer = styled.div`
  display: grid;
  grid-template-rows: 9vh 41vh 34vh;
  padding-left: 5vw;
`;

const CalendarContainer = styled.div`
  width: 100%;
`;

const ThoughtsContainer = styled.div`
  padding-top: 8vh;
`;

const Home = (): React.ReactElement => {
  const user = useStore((state) => state.user);
  const { getDayExists, getDay, createDay, editDay } = useDay();
  const [mode, setMode] = useState(CalendarMode.calendar);
  const [day, setDay] = useState<Day>();
  const [date, setDate] = useState(toISO8601(new Date()));

  const { isLoading, isError, error } = useQuery<Promise<void>, Error>(
    ['get-day', date],
    async () => {
      if (user !== undefined) {
        const existsParams = {
          googleId: user.google_id,
          date
        };
        const res = await getDayExists(existsParams);
        if (typeof res.result === 'boolean') {
          const dayParams = { google_id: user.google_id, date };
          const newDay = await createDay(dayParams);
          setDay(newDay.result);
        } else {
          const dayId = res.result._id;
          const day = await getDay({ dayId });
          setDay(day.result);
        }
      }
    }
  );

  const updateDay = async (updateParams: UpdateDayProps): Promise<void> => {
    if (day !== undefined) {
      const res = await editDay({ _id: day._id, ...updateParams });
      setDay(res.result);
    }
  };

  const loading = isLoading || day === undefined || day.date !== date;

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <HomeContainer>
      <LeftContentContainer>
        <Welcome />
        <PhotosContainer>
          {loading ? (
            <Skeleton count={9} />
          ) : (
            <Photos date={date} day={day} setDay={setDay} />
          )}
        </PhotosContainer>
        <BottomContentContainer>
          <EntryContainer>
            {loading ? (
              <Skeleton count={16} />
            ) : (
              <Entry
                updateDay={updateDay}
                key={date}
                title={day.title}
                entry={day.entry}
                isFavorite={day.is_favorite}
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
                  key={date}
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
                  key={date}
                  food={day.food}
                  updateDay={updateDay}
                />
              )}
            </SongFoodContainer>
          </BottomRightContentContainer>
        </BottomContentContainer>
      </LeftContentContainer>
      <RightContentContainer>
        <IconBar mode={mode} setMode={setMode} setDate={setDate} />
        <CalendarContainer>
          {mode === CalendarMode.calendar ? (
            <Calendar date={date} setDate={setDate} />
          ) : mode === CalendarMode.favorites ? (
            <Favorites
              date={date}
              setDate={setDate}
              key={String(day?.is_favorite)}
            />
          ) : (
            <OnThisDay date={date} setDate={setDate} />
          )}
        </CalendarContainer>
        <ThoughtsContainer>
          {loading ? (
            <Skeleton count={10} />
          ) : (
            <Thoughts
              key={date}
              thoughts={day.thoughts}
              updateDay={updateDay}
            />
          )}
        </ThoughtsContainer>
      </RightContentContainer>
    </HomeContainer>
  );
};

export default Home;
