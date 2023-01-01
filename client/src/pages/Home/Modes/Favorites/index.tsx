import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HiOutlineBarsArrowUp, HiOutlineBarsArrowDown } from 'react-icons/hi2';

import Block from '../../../../components/Block';
import colors from '../../../../utils/colors';
import { Day } from '../../../../types/day';
import { useDay } from '../../../../hooks/day/useDay';
import { useAuthContext } from '../../../../contexts/auth/AuthContext';
import { FavoriteProps } from './types';

const FavoritesContainer = styled(Block)``;

const HeaderContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// TODO: separate component
const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
  padding: 15%;
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

const FavoriteContainer = styled.span``;

// TODO: separate into another component?
const Favorite = (props: FavoriteProps): React.ReactElement => {
  const { day } = props;
  return <FavoriteContainer>{day.date}</FavoriteContainer>;
};

const Favorites = (): React.ReactElement => {
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
          <CountIndicator>10</CountIndicator>
          <Label>Favorite Memories</Label>
          {/* TODO: implement sorting */}
          <SortDescIcon />
        </HeaderContainer>
        {favoriteDays?.map((day, key) => (
          <Favorite key={key} day={day} />
        ))}
      </PaddingContainer>
    </FavoritesContainer>
  );
};

export default Favorites;
