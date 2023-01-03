import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthContext } from './contexts/auth/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Memories from './pages/Memories';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import { useLocalStorage } from './hooks/auth/useLocalStorage';

const StyledToastContainer = styled(ToastContainer)`
  --toastify-color-success: #ffb2a7;
  --toastify-color-error: #e74c3c;
  --toastify-font-family: 'Ubuntu', sans-serif;
  --toastify-text-color-info: #ffff;
  --toastify-text-color-success: #ffff;
  --toastify-text-color-warning: #ffff;
  --toastify-text-color-error: #ffff;
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Ubuntu', sans-serif;
    padding: 0;
    margin: 0;
  }

  h1 {
    font-size: 2.3em;
    margin: 0;
    align-items: center;
    display: flex;
  }

  h3 {
    margin: 0;
  }
`;

const SplitContainer = styled.span`
  display: grid;
  grid-template-columns: 8% 92%;
  height: 100%;
`;

const App = (): React.ReactElement => {
  const [storageUser, setStorageUser] = useLocalStorage('user', undefined);
  const { user } = useAuthContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const context = useAuthContext();

  useEffect(() => {
    if (storageUser !== undefined) {
      context.setUser(storageUser);
      setIsLoggedIn(true);
    }
  }, [storageUser]);

  useEffect(() => {
    if (user !== undefined && !isLoggedIn) setIsLoggedIn(true);
  }, [user]);

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ''}>
        <GlobalStyle />
        <StyledToastContainer />
        <BrowserRouter>
          {isLoggedIn ? (
            <SplitContainer>
              <Navbar setIsLoggedIn={setIsLoggedIn} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hello" element={<div>Temporary screen</div>} />
                <Route path="/login" element={<Navigate to={'/'} />} />
                <Route path="/memories" element={<Memories />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </SplitContainer>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/hello" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/memories" element={<Navigate to="/login" />} />
              <Route path="/profile" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
