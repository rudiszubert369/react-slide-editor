import React, { useEffect, useReducer, useRef } from 'react';
import { initialState, reducer } from './store/reducer';
import { AppContext } from './providers/AppContextProvider';
import useLocalStorage from './hooks/useLocalStorage';
import { setStoredState } from './store/actions/elementActions';
import AppContent from './components/AppContent';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appRef = useRef(null);
  const [localStorageState, setLocalStorageState] = useLocalStorage('slideEditorState', null);

  useEffect(() => {
    if (localStorageState) {
      dispatch(
        setStoredState(localStorageState)
      );
    }
  }, [localStorageState]);

  useEffect(() => {
    setLocalStorageState(state);
  }, [state, setLocalStorageState]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AppContent
        appRef={appRef}
        title={state.title}
        elements={state.elements}
      />
    </AppContext.Provider>
  );
}
export default App;