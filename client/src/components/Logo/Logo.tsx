import React from 'react';
import { LogoIllustration } from '../../illustrations/Logo.illustration';
import styled from 'styled-components';

const LogoContainer = styled.span`
  display: flex;
`;

const StyledLogoIllustration = styled(LogoIllustration)`
  width: 70px;
`;

const Title = styled.h1`
  padding-left: 5%;
`;

const Logo = (props: any): JSX.Element => {
  const { className } = props;
  return (
    <LogoContainer className={className}>
      <StyledLogoIllustration/>
      <Title>Jade</Title>
    </LogoContainer>
  );
};

export default Logo;
