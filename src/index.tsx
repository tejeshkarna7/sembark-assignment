/** React Imports */
import React from 'react';
import ReactDOM from 'react-dom/client';

/** Components */
import App from './App';

/** Styles */
import './index.css'

/** Main Export */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
