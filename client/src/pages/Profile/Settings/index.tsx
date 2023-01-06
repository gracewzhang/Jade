import React from 'react';
import styled from 'styled-components';

import Block from '../../../components/Block';
// import Label from '../../../components/Label';
// import colors from '../../../utils/colors';

const SettingsContainer = styled(Block)``;

const PaddingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Settings = (): React.ReactElement => {
  return (
    <SettingsContainer>
      <PaddingContainer></PaddingContainer>
    </SettingsContainer>
  );
};

export default Settings;
