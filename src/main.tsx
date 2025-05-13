import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './utils/i18n';

// Add necessary CSS for Leaflet
const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
linkElement.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
linkElement.crossOrigin = '';
document.head.appendChild(linkElement);

// CSS for routing machine
const routingCssElement = document.createElement('link');
routingCssElement.rel = 'stylesheet';
routingCssElement.href = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css';
document.head.appendChild(routingCssElement);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);