import ReactDOM from 'react-dom/client';
import React from 'react';

import './index.css';
import App from './App';
import { AuthContextProvider } from './Store.js/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider> 
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthContextProvider>
);
