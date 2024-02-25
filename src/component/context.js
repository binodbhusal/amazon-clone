import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

export const ContextProvider = ({ reducer, initialState, children }) => (
  <Context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </Context.Provider>
);
export const useStateValue = () => useContext(Context);

ContextProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.shape({
  }).isRequired,
  children: PropTypes.node,
};

ContextProvider.defaultProps = {
  children: null,
};
