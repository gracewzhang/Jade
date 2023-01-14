import React, { BaseSyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { HiOutlineHeart } from 'react-icons/hi2';
import { HiOutlineCheck } from 'react-icons/hi';

import Block from '../../../components/Block';
import colors from '../../../utils/colors';
import { EntryProps, FilledHeartProps } from './types';
import Input from '../../../components/Input/input';
import useStore from '../../../stores';
import { useMutation } from 'react-query';

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 84%;
  padding: 8%;
`;

const HeaderContainer = styled.span`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledHeart = styled(HiOutlineHeart)`
  width: 25px;
  height: 25px;
  color: ${colors['light-grey']};

  :hover {
    cursor: pointer;
  }
`;

const FilledHeart = styled(StyledHeart)<FilledHeartProps>`
  stroke-width: 0;
  fill: ${(props) => props.primarycolor};
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

const TitleContainer = styled(Input)`
  height: 10%;
  font-size: 17px;
  font-weight: 600;
`;

const BodyContainer = styled(Input)`
  height: 70%;
  font-size: 15px;
  line-height: 30px;
`;

const MAX_LEN = 200;

const Entry = (props: EntryProps): React.ReactElement => {
  const user = useStore((state) => state.user);
  const [title, setTitle] = useState(props.title);
  const [entry, setEntry] = useState(props.entry);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);

  const onTitleChange = (e: BaseSyntheticEvent): void => {
    const newTitle = e.target.value;
    if ((newTitle as string).length + entry.length <= MAX_LEN) {
      setTitle(newTitle);
    }
  };

  const onEntryChange = (e: BaseSyntheticEvent): void => {
    const newEntry = e.target.value;
    if ((newEntry as string).length + title.length <= MAX_LEN) {
      setEntry(newEntry);
    }
  };

  const save = useMutation({
    mutationFn: async (): Promise<void> => {
      await props.updateDay({ title, entry, is_favorite: isFavorite });
    }
  });

  return (
    <Block>
      <PaddingContainer>
        <HeaderContainer>
          {isFavorite ? (
            <FilledHeart
              onClick={() => setIsFavorite(false)}
              primarycolor={user?.primary_color ?? colors.rose}
            />
          ) : (
            <StyledHeart onClick={() => setIsFavorite(true)} />
          )}
          <HeaderRightContainer>
            <LengthIndicator>
              {MAX_LEN - entry.length - title.length}
            </LengthIndicator>
            <StyledCheck onClick={() => save.mutate()} />
          </HeaderRightContainer>
        </HeaderContainer>
        <TitleContainer
          placeholder="Title"
          onChange={onTitleChange}
          maxLength={MAX_LEN - entry.length}
          defaultValue={props.title}
        />
        <BodyContainer
          placeholder="Entry"
          onChange={onEntryChange}
          maxLength={MAX_LEN - title.length}
          defaultValue={props.entry}
        />
      </PaddingContainer>
    </Block>
  );
};

export default Entry;
