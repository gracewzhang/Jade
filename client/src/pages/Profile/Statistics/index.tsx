import React from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';
import Label from '../../../components/Label';
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
  return (
    <StatisticsContainer>
      <PaddingContainer>
        <HeaderContainer>
          <Label>Statistics</Label>
        </HeaderContainer>
      </PaddingContainer>
    </StatisticsContainer>
  );
};

export default Statistics;
