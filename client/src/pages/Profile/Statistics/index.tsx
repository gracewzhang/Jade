import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';
import Label from '../../../components/Label';
import { useUser } from '../../../hooks/user/useUser';
import useStore from '../../../stores';
import { getDayDifference } from '../../../utils/date';
import { StatisticProps } from './types';

const StatisticsContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  padding: 5%;
`;

const HeaderContainer = styled.span`
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.span`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 75%;
`;

const StatisticContainer = styled.div``;

const StatLabel = styled.h1`
  justify-content: center;
  padding-top: 5%;
  font-size: 2.5em;
  font-weight: 500;
`;

const DescriptionLabel = styled.h3`
  text-align: center;
  font-weight: 500;
  color: #4d4d4d;
  padding-top: 10%;
`;

const Statistic = (props: StatisticProps): React.ReactElement => {
  const { stat, description } = props;
  return (
    <StatisticContainer>
      <StatLabel>{stat}</StatLabel>
      <DescriptionLabel>{description}</DescriptionLabel>
    </StatisticContainer>
  );
};

const Statistics = (): React.ReactElement => {
  const user = useStore((state) => state.user);
  const { getNumberOfDays } = useUser();
  const [numDays, setNumDays] = useState(9); // TODO: change lol
  const [daysSinceJoined, setDaysSinceJoined] = useState(2); // TODO: change as well lol

  useEffect(() => {
    const retrieveNumberOfDays = async (): Promise<void> => {
      if (user !== undefined) {
        const res = await getNumberOfDays({ googleId: user.google_id });
        if (res.result !== undefined) {
          setNumDays(res.result);
        }
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    retrieveNumberOfDays();
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      const joinedDate = new Date(user.created_at);
      const daysDiff = getDayDifference(new Date(), joinedDate);
      setDaysSinceJoined(daysDiff);
    }
  }, []);

  return (
    <StatisticsContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>Statistics</Label>
        </HeaderContainer>
        <ContentContainer>
          <Statistic
            stat={numDays}
            description={
              numDays === 1 ? 'memory recorded' : 'memories recorded'
            }
          />
          <Statistic
            stat={daysSinceJoined}
            description="days since you began"
          />
        </ContentContainer>
      </PaddingContainer>
    </StatisticsContainer>
  );
};

export default Statistics;
