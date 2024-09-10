import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CSVDataProvider } from './context/DataContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CSVDataProvider>
      <App />
    </CSVDataProvider>
  </React.StrictMode>
);

