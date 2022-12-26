import React, { BaseSyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { IoIosCheckmark } from 'react-icons/io';
import { HiOutlineLightBulb } from 'react-icons/hi2';

import Block from '../../../components/Block';
import Input from '../../../components/Input/input';
import colors from '../../../utils/colors';
import { ThoughtProps, ThoughtsProps } from './types';

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

const Thought = (props: ThoughtProps): React.ReactElement => {
  const [thought, setThought] = useState(props.thoughts[props.idx]);

  const onThoughtChange = (e: BaseSyntheticEvent): void => {
    const newThought = e.target.value;
    if ((newThought as string).length <= MAX_LEN) {
      setThought(newThought);
      // TODO: setThoughts(... this one given idx)
    }
  };

  return (
    <ThoughtContainer>
      <StyledLightBulb />
      <StyledInput
        placeholder="Thought"
        defaultValue={props.thoughts[props.idx]}
        onChange={onThoughtChange}
        maxLength={MAX_LEN}
      />
      <LengthIndicator>{MAX_LEN - thought.length}</LengthIndicator>
    </ThoughtContainer>
  );
};

const Thoughts = (props: ThoughtsProps): React.ReactElement => {
  const [thoughts, setThoughts] = useState(props.thoughts);

  const handleClick = (): void => {
    const save = async (): Promise<void> => {
      await props.updateDay({ thoughts });
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    save();
  };

  return (
    <ThoughtsContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>What are You Thinking About?</Label>
          <StyledCheck onClick={handleClick} />
        </HeaderContainer>
        <BottomContainer>
          <Thought idx={0} thoughts={thoughts} setThoughts={setThoughts} />
          <Thought idx={1} thoughts={thoughts} setThoughts={setThoughts} />
          <Thought idx={2} thoughts={thoughts} setThoughts={setThoughts} />
        </BottomContainer>
      </PaddingContainer>
    </ThoughtsContainer>
  );
};

export default Thoughts;
