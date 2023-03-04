import React, { useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';
import { initialState, reducer } from './store/reducer';
import DndWrapper from './components/DndWrapper';
import { AppContext } from './providers/AppContextProvider';
import Title from './components/Title';
import ElementList from './components/ElementList';
import ExportButtons from './components/ExportButtons';
import useLocalStorage from './hooks/useLocalStorage';
import { SET_STORED_STATE } from './store/actions/action-types.js';

const AppContainer = styled.div`
  color: black;
  margin-top: 70px;
`;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appRef = useRef(null);

  const [storedState, setStoredState] = useLocalStorage('slideEditorState', null);

  useEffect(() => {
    if (storedState) {
      dispatch({
        type: SET_STORED_STATE,
        payload: storedState,
      });
    }
  }, [storedState]);

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  return (
    <DndWrapper>
      <AppContext.Provider value={{ state, dispatch }}>
        <AppContainer ref={appRef}>
          <Title title={state.title} />
          <ElementList elements={state.elements} />
        </AppContainer>
        <ExportButtons appRef={appRef}/>
      </AppContext.Provider>
    </DndWrapper>
  );
}

export default App;