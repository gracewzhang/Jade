import React, { BaseSyntheticEvent, useRef, useState } from 'react';
import styled from 'styled-components';
import { HiOutlineCheck } from 'react-icons/hi';
import { HiOutlineLightBulb } from 'react-icons/hi2';

import Block from '../../../components/Block';
import Input from '../../../components/Input/input';
import Label from '../../../components/Label';
import colors from '../../../utils/colors';
import { ThoughtProps, ThoughtsProps } from './types';
import { useMutation } from 'react-query';

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

const StyledCheck = styled(HiOutlineCheck)`
  width: 18px;
  height: 18px;
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
  const { idx, thoughts } = props;
  const [thought, setThought] = useState(thoughts.current[idx]);

  const onThoughtChange = (e: BaseSyntheticEvent): void => {
    const newThought = e.target.value;
    if ((newThought as string).length <= MAX_LEN) {
      thoughts.current[idx] = newThought;
      setThought(newThought);
    }
  };

  return (
    <ThoughtContainer>
      <StyledLightBulb
        color={thought.length === 0 ? colors['light-grey'] : colors.grey}
      />
      <StyledInput
        placeholder="Thought"
        defaultValue={thoughts.current[idx]}
        onChange={onThoughtChange}
        maxLength={MAX_LEN}
      />
      <LengthIndicator>{MAX_LEN - thought.length}</LengthIndicator>
    </ThoughtContainer>
  );
};

// TODO: thoughts css is wack
const Thoughts = (props: ThoughtsProps): React.ReactElement => {
  const thoughts = useRef(props.thoughts);

  const save = useMutation({
    mutationFn: async (): Promise<void> => {
      await props.updateDay({ thoughts: thoughts.current });
    }
  });

  return (
    <ThoughtsContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>Thoughts</Label>
          <StyledCheck onClick={() => save.mutate()} />
        </HeaderContainer>
        <BottomContainer>
          {[0, 1, 2].map((idx) => (
            <Thought key={idx} idx={idx} thoughts={thoughts} />
          ))}
        </BottomContainer>
      </PaddingContainer>
    </ThoughtsContainer>
  );
};

export default Thoughts;
