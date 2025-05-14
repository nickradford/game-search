import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './tailwind.css';
import App from './App';
import { store, persistor } from './redux/store';
import { Analytics } from "@vercel/analytics/react"


persistor.persist();

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </>
      </BrowserRouter>
    </Provider>
    <Analytics />
  </React.StrictMode>,
);