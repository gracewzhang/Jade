import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';

import { useAuthContext } from '../contexts/AuthContext';
import { DecodedUser, NewUser } from '../models/user';

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
  const { user, checkIfNewUser, signIn, signUp } = useAuthContext();
  const handleSuccess = async (credentialResponse: CredentialResponse): Promise<void> => {
    const userInfo: DecodedUser = jwt_decode(credentialResponse.credential ?? '');
    const user: NewUser = {
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
      <p>Hello!</p>
      <LoginContainer>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            void (async (credentialResponse) => {
              await handleSuccess(credentialResponse);
            })(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default Login;
