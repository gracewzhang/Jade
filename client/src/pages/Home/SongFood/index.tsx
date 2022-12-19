import React from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';

const SongFoodContainer = styled(Block)`

`;

const SongFood = (): React.ReactElement => {
  return (
    <SongFoodContainer>
      Song/Food
    </SongFoodContainer>
  );
};

export default SongFood;
