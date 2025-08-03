// src/main.jsx

// 1. import Poppins weights
import '@fontsource/poppins/400.css'; // regular
import '@fontsource/poppins/600.css'; // semibold
import '@fontsource/poppins/700.css'; // bold

// 2. own global CSS
import './index.css';

// 3. the rest of your app
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
