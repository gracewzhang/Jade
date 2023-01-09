import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/auth/AuthContext';
import { SettingsProvider } from './contexts/settings/SettingsContext';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </AuthProvider>
);
