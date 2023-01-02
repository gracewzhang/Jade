import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  HiOutlineBarsArrowUp,
  HiOutlineBarsArrowDown,
  HiOutlineHeart
} from 'react-icons/hi2';

import Block from '../../../../components/Block';
import colors from '../../../../utils/colors';
import { Day } from '../../../../types/day';
import { useDay } from '../../../../hooks/day/useDay';
import { useAuthContext } from '../../../../contexts/auth/AuthContext';
import { FavoriteContainerProps, FavoriteProps, FavoritesProps } from './types';

const FavoritesContainer = styled(Block)``;

// TODO: separate component
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

// TODO: separate component? used by songfood too
const Label = styled.h5`
  margin: 0;
  display: flex;
  align-items: center;
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
`;

const OuterContainer = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 8px;
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
  width: 30%;
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

// TODO: separate into another component?
const Favorite = (props: FavoriteProps): React.ReactElement => {
  const { day, setDate, selected } = props;
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

// TODO: unheart a day --> component should rerender w/o that day
const Favorites = (props: FavoritesProps): React.ReactElement => {
  const { date, setDate } = props;
  const { user } = useAuthContext();
  const { getFavorites } = useDay();
  const [favoriteDays, setFavoriteDays] = useState<Day[]>();

  useEffect(() => {
    const retrieveFavoriteDays = async (): Promise<void> => {
      if (user !== undefined) {
        const res = await getFavorites({ googleId: user.google_id });
        setFavoriteDays(res.result);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    retrieveFavoriteDays();
  }, []);

  return (
    <FavoritesContainer>
      <PaddingContainer>
        <HeaderContainer>
          <CountIndicator>{favoriteDays?.length}</CountIndicator>
          <Label>Favorite Memories</Label>
          {/* TODO: implement sorting */}
          <SortDescIcon />
        </HeaderContainer>
        <OuterContainer>
          <DaysContainer>
            {favoriteDays?.map((day, key) => (
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
