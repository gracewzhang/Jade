import React from 'react';
import { LogoIllustration } from '../../illustrations/Logo.illustration';
import styled from 'styled-components';

const LogoContainer = styled.span`
  display: flex;
  padding: 5%;
`;

const Title = styled.h1`
`;

const Logo = (): JSX.Element => {
  return (
    <LogoContainer>
      <LogoIllustration/>
      <Title>Jade</Title>
    </LogoContainer>
  );
};

export default Logo;
