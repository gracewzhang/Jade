import React from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';
// import Label from '../../../components/Label';
// import colors from '../../../utils/colors';

const StatisticsContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Statistics = (): React.ReactElement => {
  return (
    <StatisticsContainer>
      <PaddingContainer></PaddingContainer>
    </StatisticsContainer>
  );
};

export default Statistics;
