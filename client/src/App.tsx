import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import useStore from './stores';
import colors from './utils/colors';
import { SkeletonTheme } from 'react-loading-skeleton';

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
  grid-template-columns: 1fr 10fr;
  height: 100%;
`;

const App = (): React.ReactElement => {
  const user = useStore((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user !== undefined && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ''}>
      <GlobalStyle />
      <StyledToastContainer />
      <SkeletonTheme baseColor={colors['super-light-grey']} borderRadius="30px">
        <BrowserRouter>
          {isLoggedIn ? (
            <SplitContainer>
              <Navbar
                setIsLoggedIn={setIsLoggedIn}
                primaryColor={user?.primary_color ?? colors.rose}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hello" element={<div>Temporary screen</div>} />
                <Route path="/login" element={<Navigate to={'/'} />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </SplitContainer>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/hello" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/messages" element={<Navigate to="/login" />} />
              <Route path="/profile" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </BrowserRouter>
      </SkeletonTheme>
    </GoogleOAuthProvider>
  );
};

export default App;
