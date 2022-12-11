import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import jwt_decode from 'jwt-decode';

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
  return (
    <LoginPageContainer>
      <p>hello</p>
      <LoginContainer>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(jwt_decode(credentialResponse.credential ?? ''));
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
