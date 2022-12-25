import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/auth/AuthContext';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
