import React, { useState } from 'react';
import styled from 'styled-components';
import { FiHeart } from 'react-icons/fi';

import Block from '../../../components/Block';
import colors from '../../../styles/colors';

const EntryContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  padding: 10%;
`;

const IconsContainer = styled.span`
  height: 10%;
`;

const StyledHeart = styled(FiHeart)`
  width: 20px;
  height: 20px;
  color: ${colors['light-grey']};
`;

// TODO: should I move this into the /components folder so the thoughts component can use it too?
const InputContainer = styled.textarea`
  resize: none;
  font-family: 'Ubuntu', sans-serif;
  outline: 0;
  border: 0;
`;

const TitleContainer = styled(InputContainer)`
  height: 10%;
  font-size: 17px;
`;

const BodyContainer = styled(InputContainer)`
  height: 80%;
  font-size: 15px;
`;

const maxTitleLen = 30;
const maxNoteLen = 300;

const Entry = (): React.ReactElement => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  return (
    <EntryContainer>
      <PaddingContainer>
        <IconsContainer>
          <StyledHeart />
        </IconsContainer>
        <TitleContainer placeholder="Title" />
        <BodyContainer placeholder="Note" />
      </PaddingContainer>
    </EntryContainer>
  );
};

export default Entry;
