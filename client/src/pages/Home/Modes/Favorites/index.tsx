import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  HiOutlineBarsArrowUp,
  HiOutlineBarsArrowDown,
  HiOutlineHeart
} from 'react-icons/hi2';

import Block from '../../../../components/Block';
import Label from '../../../../components/Label';
import colors from '../../../../utils/colors';
import { Day } from '../../../../types/day';
import { useDay } from '../../../../hooks/day/useDay';
import { FavoritesProps, HeartProps } from './types';
import DayItem from '../../../../components/DayItem/DayItem';
import ScrollContainer from '../../../../components/ScrollContainer';
import useStore from '../../../../stores';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';

const FavoritesContainer = styled(Block)`
  overflow: hidden;
`;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10% 10% 5% 10%;
`;

const HeaderContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 3%;
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

const StyledScrollContainer = styled(ScrollContainer)`
  height: 70%;

  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
  }
`;

const DaysContainer = styled.div`
  padding: 0% 8% 0% 8%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledHeart = styled(HiOutlineHeart)<HeartProps>`
  width: 25px;
  height: 25px;
  stroke-width: 1px;
  stroke: ${(props) => props.primarycolor};
`;

const Favorites = (props: FavoritesProps): React.ReactElement => {
  const { date, setDate } = props;
  const user = useStore((state) => state.user);
  const { getFavorites } = useDay();
  const favoriteDays = useRef<Day[]>();
  const [descending, setDescending] = useState(true);
  const [rerender, setRerender] = useState(true);

  const { isLoading, isError, error } = useQuery<Promise<void>, Error>(
    'get-user-favorites',
    async () => {
      if (user !== undefined) {
        const res = await getFavorites({ googleId: user.google_id });
        const reversed = res.result.reverse();
        favoriteDays.current = reversed;
      }
    }
  );

  const reverseDays = (days: Day[]): void => {
    const reversed = days.reverse();
    favoriteDays.current = reversed;
    setRerender(!rerender);
  };

  useEffect(() => {
    if (favoriteDays.current !== undefined) {
      reverseDays(favoriteDays.current);
    }
  }, [descending]);

  if (isLoading) {
    return <Skeleton count={18} />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <FavoritesContainer>
      <PaddingContainer>
        <HeaderContainer>
          <CountIndicator>{favoriteDays.current?.length}</CountIndicator>
          <Label>Favorite Memories</Label>
          {descending ? (
            <SortDescIcon onClick={() => setDescending(false)} />
          ) : (
            <SortAscIcon onClick={() => setDescending(true)} />
          )}
        </HeaderContainer>
      </PaddingContainer>
      <StyledScrollContainer scroll={true}>
        <DaysContainer>
          {favoriteDays.current?.map((day, key) => (
            <DayItem
              key={key}
              day={day}
              setDate={setDate}
              selected={day.date === date}
              icon={
                <StyledHeart
                  primarycolor={user?.primary_color ?? colors.rose}
                />
              }
            />
          ))}
        </DaysContainer>
      </StyledScrollContainer>
    </FavoritesContainer>
  );
};

export default Favorites;
