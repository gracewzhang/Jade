import React, { BaseSyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { HiOutlineCheck } from 'react-icons/hi';

import Block from '../../../components/Block';
import Input from '../../../components/Input/input';
import Label from '../../../components/Label';
import colors from '../../../utils/colors';
import { SongFoodProps } from './types';
import { SF } from '../../../utils/enums';
import { useMutation } from 'react-query';

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

const HeaderRightContainer = styled.span`
  display: flex;
  align-items: center;
`;

const StyledCheck = styled(HiOutlineCheck)`
  width: 18px;
  height: 18px;
  color: ${colors['light-grey']};

  :hover {
    cursor: pointer;
    color: ${colors.grey};
  }
`;

const LengthIndicator = styled.p`
  margin: 0;
  margin-right: 20px;
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

  const save = useMutation({
    mutationFn: async (): Promise<void> => {
      await props.updateDay(
        props.type === SF.song ? { song: value } : { food: value }
      );
    }
  });

  return (
    <SongFoodContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>{props.type}</Label>
          <HeaderRightContainer>
            <LengthIndicator>{MAX_LEN - (value?.length ?? 0)}</LengthIndicator>
            <StyledCheck onClick={() => save.mutate()} />
          </HeaderRightContainer>
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
