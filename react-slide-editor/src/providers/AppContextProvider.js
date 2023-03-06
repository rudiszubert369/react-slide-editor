import React, { createContext, useReducer } from 'react';
import { initialState, reducer } from '../store/reducer';

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
