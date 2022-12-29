import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineHeart
} from 'react-icons/hi2';
import { CgDice3 } from 'react-icons/cg';

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
import { CalendarMode, SF } from '../../utils/enums';
import colors from '../../utils/colors';

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 50vw 28vw;
  padding: 7vh 7vw 9vh 7vw;
  height: 84vh;
`;

const LeftContentContainer = styled.div`
  display: grid;
  grid-template-rows: 13vh 26vh 45vh;
`;

const PhotosContainer = styled.div`
  width: 50vw;
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
  display: grid;
  grid-template-rows: 50% 50%;
  max-height: 45vh;
`;

const SongFoodContainer = styled.div`
  width: 15vw;
  padding-top: 7vh;
`;

const RightContentContainer = styled.div`
  display: grid;
  grid-template-rows: 9vh 41vh 34vh;
  padding-left: 5vw;
`;

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

const CalendarContainer = styled.div`
  width: 23vw;
`;

const ThoughtsContainer = styled.div`
  padding-top: 8vh;
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
  const [mode, setMode] = useState(CalendarMode.calendar);
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
          <IconsContainer>
            {/* // TODO: can we store all of this in a map/list? */}
            <StyledClockIcon
              color={
                mode === CalendarMode.history ? 'black' : colors['light-grey']
              }
              onClick={() => setMode(CalendarMode.history)}
            />
            <StyledHeartIcon
              color={
                mode === CalendarMode.favorites ? 'black' : colors['light-grey']
              }
              onClick={() => setMode(CalendarMode.favorites)}
            />
            <StyledDiceIcon
              color={
                mode === CalendarMode.calendar ? 'black' : colors['light-grey']
              }
            />
            <StyledCalendarIcon
              color={
                mode === CalendarMode.calendar ? 'black' : colors['light-grey']
              }
              onClick={() => setMode(CalendarMode.calendar)}
            />
          </IconsContainer>
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
