import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthContext } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RequireAuth from './components/RequireAuth/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';

const StyledToastContainer = styled(ToastContainer)`
  --toastify-color-success: #FFB2A7;
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
  }

  h1 {
    font-size: 2.3em;
    margin: 0;
    align-items: center;
    display: flex;
  }
`;

const App = (): React.ReactElement => {
  const { user } = useAuthContext();
  // const location = useLocation();
  const pathName = '/'; // TODO

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ''}>
        <GlobalStyle />
        <StyledToastContainer/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
            {user?.google_id !== 'null' ? <Route path='/login' element={<Navigate to={pathName} />} /> : <Route path='/login' element={<Login />} />}
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
