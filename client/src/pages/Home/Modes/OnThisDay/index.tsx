import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  HiOutlineBarsArrowUp,
  HiOutlineBarsArrowDown,
  HiOutlineCloud
} from 'react-icons/hi2';

import Block from '../../../../components/Block';
import Label from '../../../../components/Label';
import colors from '../../../../utils/colors';
import { Day } from '../../../../types/day';
import { PastDay, OnThisDayProps, StyledCloudProps } from './types';
import { useDay } from '../../../../hooks/day/useDay';
import { getMonthDifference, toDate, toISO8601 } from '../../../../utils/date';
import DayItem from '../../../../components/DayItem/DayItem';
import ScrollContainer from '../../../../components/ScrollContainer';
import useStore from '../../../../stores';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';

const OnThisDayContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  padding: 10% 4% 10% 5%;
`;

const HeaderContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-right: 5%;
  padding-left: 3%;
`;

const CountIndicator = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${colors.grey};
`;

const SortDescIcon = styled(HiOutlineBarsArrowDown)`
  width: 18px;
  height: 18px;
  color: ${colors.grey};

  :hover {
    cursor: pointer;
  }
`;

const SortAscIcon = styled(HiOutlineBarsArrowUp)`
  width: 18px;
  height: 18px;
  color: ${colors.grey};

  :hover {
    cursor: pointer;
  }
`;

const PastDaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-right: 4%;
`;

const StyledCloud = styled(HiOutlineCloud)<StyledCloudProps>`
  width: 25px;
  height: 25px;
  stroke-width: 1px;
  stroke: ${(props) => props.primarycolor};
`;

const OnThisDay = (props: OnThisDayProps): React.ReactElement => {
  const { date, setDate } = props;
  const user = useStore((state) => state.user);
  const { getDaysDay } = useDay();
  const pastDays = useRef<PastDay[]>();
  const [descending, setDescending] = useState(true);
  const [rerender, setRerender] = useState(true);

  const queryDay = toISO8601(new Date()).match('[0-9]{2}$');
  const { isLoading, isError, error } = useQuery<Promise<void>, Error>(
    ['get-on-this-day', queryDay],
    async () => {
      if (
        user !== undefined &&
        queryDay?.length !== undefined &&
        queryDay.length > 0
      ) {
        const res = await getDaysDay({
          googleId: user.google_id,
          day: queryDay[0]
        });
        const newPastDays = filterPastDays(res.result);
        reverseDays(newPastDays);
      }
    }
  );

  const reverseDays = (days: PastDay[]): void => {
    const reversed = days.reverse();
    pastDays.current = reversed;
    setRerender(!rerender);
  };

  const filterPastDays = (days: Day[]): PastDay[] => {
    const newPastDays = [] as PastDay[];
    const todayDate = new Date();

    for (const day of days) {
      const otherDate = toDate(day.date);
      const diff = getMonthDifference(todayDate, otherDate);
      if (
        diff === 1 ||
        diff === 3 ||
        diff === 6 ||
        (diff !== 0 && diff % 12 === 0)
      ) {
        let when = '';
        if (diff === 1) when = '1 month ago';
        else if (diff < 12) when = `${diff} months ago`;
        else if (diff === 12) when = '1 year ago';
        else when = `${diff % 12} years ago`;

        const pastDay = { ...day, when };
        newPastDays.push(pastDay);
      }
    }
    return newPastDays;
  };

  useEffect(() => {
    if (pastDays.current !== undefined) {
      reverseDays(pastDays.current);
    }
  }, [descending]);

  if (isLoading) {
    return <Skeleton count={18} />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <OnThisDayContainer>
      <PaddingContainer>
        <HeaderContainer>
          <CountIndicator>{toISO8601(new Date()).slice(5)}</CountIndicator>
          <Label>On This Day</Label>
          {descending ? (
            <SortDescIcon onClick={() => setDescending(false)} />
          ) : (
            <SortAscIcon onClick={() => setDescending(true)} />
          )}
        </HeaderContainer>
        <ScrollContainer scroll={true}>
          <PastDaysContainer>
            {pastDays.current?.map((day, key) => (
              <DayItem
                key={key}
                day={day}
                setDate={setDate}
                selected={day.date === date}
                icon={
                  <StyledCloud
                    primarycolor={user?.primary_color ?? colors.rose}
                  />
                }
              />
            ))}
          </PastDaysContainer>
        </ScrollContainer>
      </PaddingContainer>
    </OnThisDayContainer>
  );
};

export default OnThisDay;
