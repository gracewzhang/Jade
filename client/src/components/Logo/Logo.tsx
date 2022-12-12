import React from 'react';
import { LogoIllustration } from '../../illustrations/Logo.illustration';
import styled from 'styled-components';

const LogoContainer = styled.span`
  display: flex;
`;

const Title = styled.h1`
`;

const Logo = (props: any): JSX.Element => {
  const { className } = props;
  return (
    <LogoContainer className={className}>
      <LogoIllustration/>
      <Title>Jade</Title>
    </LogoContainer>
  );
};

export default Logo;
