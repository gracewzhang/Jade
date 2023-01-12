import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';

import { AuthUser, DecodedUser } from '../../types/user';
import { LoginIllustration } from '../../illustrations/Login.illustration';
import Logo from '../../components/Logo/Logo';
import colors from '../../utils/colors';
import { useAuth } from '../../hooks/auth/useAuth';

const LoginPageContainer = styled.span`
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5% 10% 10% 30%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10%;
  padding-right: 30%;
`;

const StyledLoginIllustration = styled(LoginIllustration)`
  max-width: 90%;
  align-self: center;
`;

const LoginTitle = styled.h1``;

const LoginSubtitle = styled.h3`
  color: ${colors.grey};
  font-weight: 400;
  line-height: 25px;
`;

const StyledLogo = styled(Logo)`
  padding-bottom: 10%;
`;

const Login = (): React.ReactElement => {
  const { checkIfNewUser, signIn, signUp } = useAuth();

  const loginSubtitle =
    '"It\'s shining with all its might. Thump, thump, like a heartbeat. This is the light of life." - Kaori';

  const handleSuccess = (credentialResponse: CredentialResponse): void => {
    void (async (credentialResponse) => {
      await handleLogin(credentialResponse);
    })(credentialResponse);
  };

  const handleError = (): void => {
    console.log('Login failed');
  };

  const handleLogin = async (
    credentialResponse: CredentialResponse
  ): Promise<void> => {
    const userInfo: DecodedUser = jwt_decode(
      credentialResponse.credential ?? ''
    );
    const user: AuthUser = {
      google_id: userInfo?.sub,
      email: userInfo?.email,
      name: userInfo?.name,
      image: userInfo?.picture,
      created_at: new Date()
    };
    const isNewUser = await checkIfNewUser(userInfo?.sub);

    if (isNewUser) {
      await signUp(user);
    } else {
      await signIn(user);
    }
  };

  return (
    <LoginPageContainer>
      <LeftContainer>
        <StyledLoginIllustration />
        <LoginTitle>Thrive</LoginTitle>
        <LoginSubtitle>{loginSubtitle}</LoginSubtitle>
      </LeftContainer>
      <RightContainer>
        <StyledLogo />
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </RightContainer>
    </LoginPageContainer>
  );
};

export default Login;
