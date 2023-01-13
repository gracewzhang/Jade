import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Block from '../../../components/Block';
import Label from '../../../components/Label';
import { useUser } from '../../../hooks/user/useUser';
import useStore from '../../../stores';
import { getDayDifference } from '../../../utils/date';
import { StatisticProps } from './types';
import colors from '../../../utils/colors';

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

  const {
    isLoading: isLoadingNumDays,
    isError: isErrorNumDays,
    data: numDays,
    error: numDaysError
  } = useQuery<number, Error>(
    ['get-num-days', user?.google_id],
    async () => await getNumberOfDays({ googleId: user?.google_id ?? '' })
  );

  const {
    isLoading: isLoadingDaysJoined,
    isError: isErrorDaysJoined,
    data: daysJoined,
    error: daysJoinedError
  } = useQuery<number, Error>('get-days-joined', () => {
    if (user !== undefined) {
      const joinedDate = new Date(user.created_at);
      const daysDiff = getDayDifference(new Date(), joinedDate);
      return daysDiff;
    }
    return 0;
  });

  if (isLoadingNumDays || isLoadingDaysJoined) {
    return (
      <SkeletonTheme baseColor={colors['super-light-grey']} borderRadius="30px">
        <Skeleton count={9} />
      </SkeletonTheme>
    );
  }

  if (isErrorNumDays || isErrorDaysJoined) {
    return <div>{numDaysError?.message ?? daysJoinedError?.message}</div>;
  }

  return (
    <StatisticsContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>Statistics</Label>
        </HeaderContainer>
        <ContentContainer>
          <Statistic
            stat={numDays ?? 0}
            description={
              numDays === 1 ? 'memory recorded' : 'memories recorded'
            }
          />
          <Statistic
            stat={daysJoined ?? 0}
            description="days since you began"
          />
        </ContentContainer>
      </PaddingContainer>
    </StatisticsContainer>
  );
};

export default Statistics;
