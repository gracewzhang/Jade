import React from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';

const EntryContainer = styled(Block)`

`;

const Entry = (): React.ReactElement => {
  return (
    <EntryContainer>
      Entry
    </EntryContainer>
  );
};

export default Entry;
