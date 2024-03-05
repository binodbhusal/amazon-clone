import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
// import { ContextProvider } from './component/context';
// import { initialState, reducer } from './component/reducer';
import store from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ContextProvider initialState={initialState} reducer={reducer}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </ContextProvider> */}
  </React.StrictMode>,
);
