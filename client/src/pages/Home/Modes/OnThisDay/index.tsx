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
import { OnThisDayProps, PastDayContainerProps, PsatDayProps } from './types';
import { useAuthContext } from '../../../../contexts/auth/AuthContext';
import { useDay } from '../../../../hooks/day/useDay';

const OnThisDayContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  padding: 10% 4% 10% 8%;
`;

const HeaderContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-right: 4%;
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

const OuterContainer = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors['light-grey']};
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.grey};
  }
`;

const PastDaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-right: 4%;
`;

const CloudContainer = styled.span`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCloud = styled(HiOutlineCloud)`
  width: 25px;
  height: 25px;
  stroke-width: 1px;
  stroke: ${colors.rose};
`;

const Text = styled.p`
  line-height: 25px;
  font-size: 0.85rem;
  margin: 0;
  padding: 0;
`;

const DayTitle = styled(Text)`
  width: 50%;
`;

const DayDate = styled(Text)`
  color: ${colors.grey};
  width: 30%;
`;

const PastDayContainer = styled.span<PastDayContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 5px;

  background-color: ${(props) => (props.selected ? colors.rose : 'white')};
  p {
    color: ${(props) => (props.selected ? 'white' : 'black')};
  }
  svg {
    fill: ${(props) => (props.selected ? 'white' : 'default')};
  }

  :hover {
    cursor: pointer;
    background-color: ${colors.rose};

    p {
      color: white;
    }

    svg {
      fill: white;
    }
  }
`;

// TODO: extract into separate component used by Favorites too (DayItem?)
const PastDay = (props: PsatDayProps): React.ReactElement => {
  const { day, setDate, selected } = props;
  const temp = new Date(day.date);
  const date = new Date(
    temp.getTime() + Math.abs(temp.getTimezoneOffset() * 60000)
  );

  return (
    <PastDayContainer onClick={() => setDate(date)} selected={selected}>
      <CloudContainer>
        <StyledCloud />
      </CloudContainer>
      <DayTitle>{day.title}</DayTitle>
      <DayDate>{day.date}</DayDate>
    </PastDayContainer>
  );
};

const OnThisDay = (props: OnThisDayProps): React.ReactElement => {
  const { date, setDate } = props;
  const { user } = useAuthContext();
  const { getDaysDay } = useDay();
  const pastDays = useRef<Day[]>();
  const [descending, setDescending] = useState(true);
  const [rerender, setRerender] = useState(true);

  const reverseDays = (days: Day[]): void => {
    const reversed = days.reverse();
    pastDays.current = reversed;
    setRerender(!rerender);
  };

  const monthDiff = (d1: Date, d2: Date): number => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const filterPastDays = (days: Day[]): Day[] => {
    const newPastDays = [] as Day[];

    for (const pastDay of days) {
      const d1 = new Date(date);
      const d2 = new Date(pastDay.date);

      const diff = monthDiff(d1, d2);
      console.log(diff);
      console.log(d1);
      console.log(d2);
      if (
        diff === 1 ||
        diff === 3 ||
        diff === 6 ||
        (diff !== 0 && diff % 12 === 0)
      ) {
        newPastDays.push(pastDay);
      }
    }
    return newPastDays;
  };

  useEffect(() => {
    const retrievePastDays = async (): Promise<void> => {
      const queryDay = date.match('[0-9]{2}$');

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
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    retrievePastDays();
  }, []);

  useEffect(() => {
    if (pastDays.current !== undefined) {
      reverseDays(pastDays.current);
    }
  }, [descending]);

  return (
    <OnThisDayContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>On This Day</Label>
          {descending ? (
            <SortDescIcon onClick={() => setDescending(false)} />
          ) : (
            <SortAscIcon onClick={() => setDescending(true)} />
          )}
        </HeaderContainer>
        <OuterContainer>
          <PastDaysContainer>
            {pastDays.current?.map((day, key) => (
              <PastDay
                key={key}
                day={day}
                setDate={setDate}
                selected={day.date === date}
              />
            ))}
          </PastDaysContainer>
        </OuterContainer>
      </PaddingContainer>
    </OnThisDayContainer>
  );
};

export default OnThisDay;
