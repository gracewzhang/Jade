import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';
import Label from '../../../components/Label';
import { useAuthContext } from '../../../contexts/auth/AuthContext';
import { useUser } from '../../../hooks/user/useUser';
import { getDayDifference } from '../../../utils/date';
// import colors from '../../../utils/colors';

const StatisticsContainer = styled(Block)``;

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
  justify-content: center;
  align-items: center;
`;

const Statistics = (): React.ReactElement => {
  const { user } = useAuthContext();
  const { getNumberOfDays } = useUser();
  const [numDays, setNumDays] = useState(0);
  const [daysSinceJoined, setDaysSinceJoined] = useState(0);

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
        {numDays}
        {daysSinceJoined}
      </PaddingContainer>
    </StatisticsContainer>
  );
};

export default Statistics;
