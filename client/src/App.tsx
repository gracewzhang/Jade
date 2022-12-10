import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import Login from './pages/Login';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Ubuntu', sans-serif;
  }
`;

const App = (): React.ReactElement => {
  return (
    <>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ''}>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
