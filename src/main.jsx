import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { DonationProvider } from './context/DonationContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DonationProvider>
          <App />
        </DonationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
