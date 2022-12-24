import React, { BaseSyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { FiHeart } from 'react-icons/fi';

import Block from '../../../components/Block';
import colors from '../../../styles/colors';
import { UpdateDayParams } from '../../../models/day';

const EntryContainer = styled(Block)``;

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

const StyledHeart = styled(FiHeart)`
  width: 25px;
  height: 25px;
  color: ${colors['light-grey']};

  :hover {
    cursor: pointer;
  }
`;

const FilledHeart = styled(StyledHeart)`
  stroke-width: 0;
  fill: ${colors.rose};
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

  ::placeholder {
    color: ${colors.grey};
  }
`;

const TitleContainer = styled(InputContainer)`
  height: 10%;
  font-size: 17px;
  font-weight: 600;
`;

const BodyContainer = styled(InputContainer)`
  height: 70%;
  font-size: 15px;
  line-height: 30px;
`;

const MAX_LEN = 200;

interface EntryProps {
  updateDay: (updateParams: UpdateDayParams) => Promise<void>;
}

const Entry = (props: EntryProps): React.ReactElement => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const onTitleChange = (e: BaseSyntheticEvent): void => {
    const newTitle = e.target.value;
    if ((newTitle as string).length + note.length <= MAX_LEN) {
      setTitle(newTitle);
    }
  };

  const onNoteChange = (e: BaseSyntheticEvent): void => {
    const newNote = e.target.value;
    if ((newNote as string).length + title.length <= MAX_LEN) {
      setNote(newNote);
    }
  };

  return (
    <EntryContainer>
      <PaddingContainer>
        <HeaderContainer>
          {isFavorite ? (
            <FilledHeart onClick={() => setIsFavorite(false)} />
          ) : (
            <StyledHeart onClick={() => setIsFavorite(true)} />
          )}
          <LengthIndicator>
            {MAX_LEN - note.length - title.length}
          </LengthIndicator>
        </HeaderContainer>
        <TitleContainer
          placeholder="Title"
          onChange={onTitleChange}
          maxLength={MAX_LEN - note.length}
        />
        <BodyContainer
          placeholder="Note"
          onChange={onNoteChange}
          maxLength={MAX_LEN - title.length}
        />
      </PaddingContainer>
    </EntryContainer>
  );
};

export default Entry;
