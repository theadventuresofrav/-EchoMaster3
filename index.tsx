import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Disable browser's automatic scroll restoration to ensure manual scrolling works as expected.
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);