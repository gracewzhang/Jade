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

const FavoritesContainer = styled(Block)``;

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

const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-right: 4%;
`;

const StyledHeart = styled(HiOutlineHeart)<HeartProps>`
  width: 25px;
  height: 25px;
  stroke-width: 1px;
  stroke: ${(props) => props.primaryColor};
`;

const Favorites = (props: FavoritesProps): React.ReactElement => {
  const { date, setDate } = props;
  const user = useStore((state) => state.user);
  const { getFavorites } = useDay();
  const favoriteDays = useRef<Day[]>();
  const [descending, setDescending] = useState(true);
  const [rerender, setRerender] = useState(true);

  const reverseDays = (days: Day[]): void => {
    const reversed = days.reverse();
    favoriteDays.current = reversed;
    setRerender(!rerender);
  };

  useEffect(() => {
    const retrieveFavoriteDays = async (): Promise<void> => {
      if (user !== undefined) {
        const res = await getFavorites({ googleId: user.google_id });
        reverseDays(res.result);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    retrieveFavoriteDays();
  }, []);

  useEffect(() => {
    if (favoriteDays.current !== undefined) {
      reverseDays(favoriteDays.current);
    }
  }, [descending]);

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
        <ScrollContainer>
          <DaysContainer>
            {favoriteDays.current?.map((day, key) => (
              <DayItem
                key={key}
                day={day}
                setDate={setDate}
                selected={day.date === date}
                icon={
                  <StyledHeart
                    primaryColor={user?.primary_color ?? colors.rose}
                  />
                }
              />
            ))}
          </DaysContainer>
        </ScrollContainer>
      </PaddingContainer>
    </FavoritesContainer>
  );
};

export default Favorites;
