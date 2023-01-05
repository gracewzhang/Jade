import React from 'react';
import styled from 'styled-components';

import colors from '../../../utils/colors';

const HeaderContainer = styled.div``;

const Heading = styled.h1`
  font-weight: 400;
  font-size: 1.8em;
`;

const Subheading = styled.h3`
  font-weight: 500;
  color: ${colors['dark-grey']};
  padding-top: 15px;
`;

const Header = (): React.ReactElement => {
  const subheadingText =
    '"Open your eyes, and see what you can with them before they close forever." - All the Light We Cannot See';

  return (
    <HeaderContainer>
      <Heading>Profile</Heading>
      <Subheading>{subheadingText}</Subheading>
    </HeaderContainer>
  );
};

export default Header;
