import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';

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
            console.log(credentialResponse);
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
