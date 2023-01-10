import React from 'react';
import styled from 'styled-components';
import useStore from '../../stores';
import colors from '../../utils/colors';
import { toDate } from '../../utils/date';
import { DayItemProps, DayItemContainerProps } from './types';

const IconContainer = styled.span`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  text-align: right;
  width: 35%;
`;

const DayItemContainer = styled.span<DayItemContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 5px;

  background-color: ${(props) =>
    props.selected ? props.primaryColor : 'white'};
  p {
    color: ${(props) => (props.selected ? 'white' : 'default')};
  }
  svg {
    fill: ${(props) => (props.selected ? 'white' : 'default')};
  }

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.primaryColor};

    p {
      color: white;
    }

    svg {
      fill: white;
    }
  }
`;

const DayItem = (props: DayItemProps): React.ReactElement => {
  const { day, setDate, selected, icon } = props;
  const user = useStore((state) => state.user);
  const date = toDate(day.date);
  const subtitle = 'when' in day ? day.when : day.date;

  return (
    <DayItemContainer
      onClick={() => setDate(date)}
      selected={selected}
      primaryColor={user?.primary_color ?? colors.rose}
    >
      <IconContainer>{icon}</IconContainer>
      <DayTitle>{day.title}</DayTitle>
      <DayDate>{subtitle}</DayDate>
    </DayItemContainer>
  );
};

export default DayItem;
