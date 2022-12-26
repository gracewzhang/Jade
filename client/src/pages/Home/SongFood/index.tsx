import React, { BaseSyntheticEvent, useState } from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';
import Input from '../../../components/Input/input';
import colors from '../../../styles/colors';
import { SongFoodProps } from './types';

const SongFoodContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
  padding: 15%;
`;

const HeaderContainer = styled.span`
  height: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.h5`
  margin: 0;
  display: flex;
  align-items: center;
`;

const LengthIndicator = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${colors.grey};
`;

const StyledInput = styled(Input)`
  height: 75%;
`;

const MAX_LEN = 30;

const SongFood = (props: SongFoodProps): React.ReactElement => {
  const [value, setValue] = useState(props.song ?? props.food);

  const onValueChange = (e: BaseSyntheticEvent): void => {
    const newValue = e.target.value;
    if ((newValue as string).length <= MAX_LEN) {
      setValue(newValue);
    }
  };

  return (
    <SongFoodContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>{props.type}</Label>
          <LengthIndicator>{value?.length ?? 0}</LengthIndicator>
        </HeaderContainer>
        <StyledInput
          placeholder={props.type}
          defaultValue={props.song ?? props.food}
          onChange={onValueChange}
          maxLength={MAX_LEN}
        />
      </PaddingContainer>
    </SongFoodContainer>
  );
};

export default SongFood;
