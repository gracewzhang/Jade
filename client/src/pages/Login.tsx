import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';

import { useAuthContext } from '../contexts/AuthContext';
import { DecodedUser } from '../models/user';

const LoginPageContainer = styled.span`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 10%;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = (): React.ReactElement => {
  const { user, isNewUser, signIn, signUp } = useAuthContext();
  const handleSuccess = (credentialResponse: CredentialResponse): void => {
    const userInfo: DecodedUser = jwt_decode(credentialResponse.credential ?? '');
    const user = {
      google_id: userInfo?.sub,
      email: userInfo?.email,
      name: userInfo?.name,
      image: userInfo?.picture,
      created_at: Date.now
    };
    if (isNewUser(user) === true) {
      signUp(user);
    } else {
      signIn(user);
    }
  };

  return (
    <LoginPageContainer>
      <p>{user?.name ?? 'hello'}</p>
      <LoginContainer>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default Login;
