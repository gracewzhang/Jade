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
import Memories from './pages/Memories';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';

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
  grid-template-columns: 10% 90%;
  height: 100%;
`;

const App = (): React.ReactElement => {
  const { user } = useAuthContext();
  // const location = useLocation();
  const pathName = '/'; // TODO
  const isLoggedIn = user?.google_id !== 'null';

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID ?? ''}>
        <GlobalStyle />
        <StyledToastContainer />
        <BrowserRouter>
          {isLoggedIn
            ? <SplitContainer>
              <Navbar />
              <Routes>
                <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
                <Route path='/hello' element={<RequireAuth><div>Temporary screen</div></RequireAuth>} />
                <Route path='/login' element={<Navigate to={pathName} />} />
                <Route path='/memories' element={<RequireAuth><Memories/></RequireAuth>}/>
                <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
              </Routes>
            </SplitContainer>
            : <Routes>
              <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />
              <Route path='/hello' element={<RequireAuth><div>Temporary screen</div></RequireAuth>} />
              <Route path='/login' element={<Login />} />
              <Route path='/memories' element={<RequireAuth><Memories/></RequireAuth>}/>
              <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
            </Routes>}
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
