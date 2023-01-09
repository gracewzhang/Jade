import React from 'react';
import styled from 'styled-components';

import useStore from '../../../stores';
import colors from '../../../utils/colors';

const WelcomeContainer = styled.div``;

const Heading = styled.span`
  display: flex;
  flex-direction: row;
  white-space: pre;
`;

const NormalHeading = styled.h1`
  font-weight: 400;
  font-size: 1.8em;
`;

const NameHeading = styled(NormalHeading)`
  font-weight: 500;
`;

const Subheading = styled.h3`
  font-weight: 500;
  color: ${colors['dark-grey']};
  padding-top: 15px;
`;

const Welcome = (): React.ReactElement => {
  const user = useStore((state) => state.user);
  const subheadingText = 'Make every day your masterpiece.';

  return (
    <WelcomeContainer>
      <Heading>
        <NormalHeading>Hello, </NormalHeading>
        <NameHeading>{user?.name}!</NameHeading>
      </Heading>
      <Subheading>{subheadingText}</Subheading>
    </WelcomeContainer>
  );
};

export default Welcome;
