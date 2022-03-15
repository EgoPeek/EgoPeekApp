/**
 * FileName: Index.js
 * Description: Main entry point for the entire frontend directory
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

