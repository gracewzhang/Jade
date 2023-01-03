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
import { useAuthContext } from '../../../../contexts/auth/AuthContext';
import { FavoriteContainerProps, FavoriteProps, FavoritesProps } from './types';

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

const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-right: 4%;
`;

const HeartContainer = styled.span`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHeart = styled(HiOutlineHeart)`
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
  text-align: right;
  width: 35%;
`;

const FavoriteContainer = styled.span<FavoriteContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 5px;

  background-color: ${(props) => (props.selected ? colors.rose : 'white')};
  p {
    color: ${(props) => (props.selected ? 'white' : 'default')};
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

const Favorite = (props: FavoriteProps): React.ReactElement => {
  const { day, setDate, selected } = props;
  // TODO: utils
  const temp = new Date(day.date);
  const date = new Date(
    temp.getTime() + Math.abs(temp.getTimezoneOffset() * 60000)
  );

  return (
    <FavoriteContainer onClick={() => setDate(date)} selected={selected}>
      <HeartContainer>
        <StyledHeart />
      </HeartContainer>
      <DayTitle>{day.title}</DayTitle>
      <DayDate>{day.date}</DayDate>
    </FavoriteContainer>
  );
};

const Favorites = (props: FavoritesProps): React.ReactElement => {
  const { date, setDate } = props;
  const { user } = useAuthContext();
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
        <OuterContainer>
          <DaysContainer>
            {favoriteDays.current?.map((day, key) => (
              <Favorite
                key={key}
                day={day}
                setDate={setDate}
                selected={day.date === date}
              />
            ))}
          </DaysContainer>
        </OuterContainer>
      </PaddingContainer>
    </FavoritesContainer>
  );
};

export default Favorites;
