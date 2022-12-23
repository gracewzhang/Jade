import React, { BaseSyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { FiHeart } from 'react-icons/fi';

import Block from '../../../components/Block';
import colors from '../../../styles/colors';

const EntryContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
  padding: 10%;
`;

const HeaderContainer = styled.span`
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledHeart = styled(FiHeart)`
  width: 20px;
  height: 20px;
  color: ${colors['light-grey']};
`;

const LengthIndicator = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${colors.grey};
`;

// TODO: should I move this into the /components folder so the thoughts component can use it too?
const InputContainer = styled.textarea`
  resize: none;
  font-family: 'Ubuntu', sans-serif;
  line-height: 25px;
  outline: 0;
  border: 0;
`;

const TitleContainer = styled(InputContainer)`
  height: 10%;
  font-size: 17px;
`;

const BodyContainer = styled(InputContainer)`
  height: 70%;
  font-size: 15px;
`;

const maxLen = 200;

const Entry = (): React.ReactElement => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const onTitleChange = (e: BaseSyntheticEvent): void => {
    const newTitle = e.target.value;
    if ((newTitle as string).length + note.length <= maxLen) {
      setTitle(newTitle);
    }
  };

  const onNoteChange = (e: BaseSyntheticEvent): void => {
    const newNote = e.target.value;
    if ((newNote as string).length + title.length <= maxLen) {
      setNote(newNote);
    }
  };

  return (
    <EntryContainer>
      <PaddingContainer>
        <HeaderContainer>
          <StyledHeart />
          <LengthIndicator>
            {maxLen - note.length - title.length}
          </LengthIndicator>
        </HeaderContainer>
        <TitleContainer
          placeholder="Title"
          onChange={onTitleChange}
          maxLength={maxLen - note.length}
        />
        <BodyContainer
          placeholder="Note"
          onChange={onNoteChange}
          maxLength={maxLen - title.length}
        />
      </PaddingContainer>
    </EntryContainer>
  );
};

export default Entry;
