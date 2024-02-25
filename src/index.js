import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './component/context';
import { initialState, reducer } from './component/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider initialState={initialState} reducer={reducer}>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
