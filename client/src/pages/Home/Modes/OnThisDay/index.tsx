import React, { useState } from 'react';
import styled from 'styled-components';
import {
  HiOutlineBarsArrowUp,
  HiOutlineBarsArrowDown,
  HiOutlineCloud
} from 'react-icons/hi2';

import Block from '../../../../components/Block';
import Label from '../../../../components/Label';
import colors from '../../../../utils/colors';
import { PastDayContainerProps } from './types';
import { useAuthContext } from '../../../../contexts/auth/AuthContext';

const OnThisDayContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  padding: 10% 4% 10% 8%;
`;

const HeaderContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-right: 4%;
`;

const SortDescIcon = styled(HiOutlineBarsArrowDown)`
  width: 18px;
  height: 18px;
  color: ${colors.grey};

  :hover {
    cursor: pointer;
  }
`;

const SortAscIcon = styled(HiOutlineBarsArrowUp)`
  width: 18px;
  height: 18px;
  color: ${colors.grey};

  :hover {
    cursor: pointer;
  }
`;

const OuterContainer = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors['light-grey']};
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.grey};
  }
`;

const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding-right: 4%;
`;

const CloudContainer = styled.span`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCloud = styled(HiOutlineCloud)`
  width: 25px;
  height: 25px;
  stroke-width: 1px;
  stroke: ${colors.rose};
`;

const Text = styled.p`
  line-height: 25px;
  font-size: 0.85rem;
  margin: 0;
  padding: 0;
`;

const DayTitle = styled(Text)`
  width: 50%;
`;

const DayDate = styled(Text)`
  color: ${colors.grey};
  width: 30%;
`;

const PastDayContainer = styled.span<PastDayContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 5px;

  background-color: ${(props) => (props.selected ? colors.rose : 'white')};
  p {
    color: ${(props) => (props.selected ? 'white' : 'black')};
  }
  svg {
    fill: ${(props) => (props.selected ? 'white' : 'default')};
  }

  :hover {
    cursor: pointer;
    background-color: ${colors.rose};

    p {
      color: white;
    }

    svg {
      fill: white;
    }
  }
`;

const Day = (): React.ReactElement => {
  const selected = false;
  return (
    <PastDayContainer selected={selected}>
      <CloudContainer>
        <StyledCloud />
      </CloudContainer>
      <DayTitle>hello</DayTitle>
      <DayDate>Hello</DayDate>
    </PastDayContainer>
  );
};

const OnThisDay = (): React.ReactElement => {
  const { user } = useAuthContext();
  const [descending, setDescending] = useState(true);

  return (
    <OnThisDayContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>On This Day</Label>
          {descending ? (
            <SortDescIcon onClick={() => setDescending(false)} />
          ) : (
            <SortAscIcon onClick={() => setDescending(true)} />
          )}
        </HeaderContainer>
        <OuterContainer>
          <DaysContainer></DaysContainer>
        </OuterContainer>
      </PaddingContainer>
    </OnThisDayContainer>
  );
};

export default OnThisDay;
