import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthContext } from './contexts/AuthContext';

import RequireAuth from './components/RequireAuth/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Ubuntu', sans-serif;
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
