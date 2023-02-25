import '@/app/css/tailwind.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app';

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
