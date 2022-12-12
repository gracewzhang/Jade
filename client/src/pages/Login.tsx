import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';

import { useAuthContext } from '../contexts/AuthContext';
import { DecodedUser, User } from '../models/user';
import { LoginIllustration } from '../illustrations/Login.illustration';
import Logo from '../components/Logo/Logo';

const LoginPageContainer = styled.span`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 10%;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Login = (): React.ReactElement => {
  const { checkIfNewUser, signIn, signUp } = useAuthContext();

  const handleSuccess = (credentialResponse: CredentialResponse): void => {
    void (async (credentialResponse) => {
      await handleLogin(credentialResponse);
    })(credentialResponse);
  };

  const handleError = (): void => {
    console.log('Login failed');
  };

  const handleLogin = async (credentialResponse: CredentialResponse): Promise<void> => {
    const userInfo: DecodedUser = jwt_decode(credentialResponse.credential ?? '');
    const user: User = {
      google_id: userInfo?.sub,
      email: userInfo?.email,
      name: userInfo?.name,
      image: userInfo?.picture,
      created_at: new Date()
    };
    const isNewUser = await checkIfNewUser(user);

    if (isNewUser) {
      await signUp(user);
    } else {
      await signIn(user);
    }
  };

  return (
    <LoginPageContainer>
      <LoginIllustration/>
      <LoginContainer>
        <Logo/>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default Login;
