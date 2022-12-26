import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosCheckmark } from 'react-icons/io';
import { HiOutlineLightBulb } from 'react-icons/hi2';

import Block from '../../../components/Block';
import Input from '../../../components/Input/input';
import colors from '../../../utils/colors';

const ThoughtsContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
  padding: 10%;
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

const StyledCheck = styled(IoIosCheckmark)`
  width: 25px;
  height: 25px;
  color: ${colors['light-grey']};

  :hover {
    cursor: pointer;
    color: ${colors.grey};
  }
`;

const BottomContainer = styled.div`
  height: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ThoughtContainer = styled.span`
  height: 33%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledLightBulb = styled(HiOutlineLightBulb)`
  width: 25px;
  height: 25px;
  margin-right: 15px;
  color: ${colors['light-grey']};

  :hover {
    cursor: pointer;
    color: ${colors.grey};
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const LengthIndicator = styled.p`
  margin: 0;
  margin-right: 10px;
  font-size: 14px;
  color: ${colors.grey};
`;

const MAX_LEN = 20;

const Thought = (): React.ReactElement => {
  const [thought, setThought] = useState('');

  return (
    <ThoughtContainer>
      <StyledLightBulb />
      <StyledInput placeholder="Thought" maxLength={MAX_LEN} />
      <LengthIndicator>{MAX_LEN - thought.length}</LengthIndicator>
    </ThoughtContainer>
  );
};

const Thoughts = (): React.ReactElement => {
  const [thoughts, setThoughts] = useState([]);

  return (
    <ThoughtsContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>What are You Thinking About?</Label>
          <StyledCheck />
        </HeaderContainer>
        <BottomContainer>
          <Thought />
          <Thought />
          <Thought />
        </BottomContainer>
      </PaddingContainer>
    </ThoughtsContainer>
  );
};

export default Thoughts;
