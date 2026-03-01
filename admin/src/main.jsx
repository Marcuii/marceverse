/**
 * @file main.jsx
 * @description Admin panel entry point.
 *
 * Mounts the React application inside `<BrowserRouter>` for client-side
 * routing and wraps it in `<StrictMode>` for development warnings.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
