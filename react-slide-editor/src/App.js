import React, { useEffect, useReducer, createContext, useRef } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Title from './components/Title';
import ElementList from './components/ElementList';
import { initialState, reducer } from './reducer';
import { SET_STORED_STATE } from './actions/action-types.js';
import ExportButtons from './components/ExportButtons';

const AppContainer = styled.div`
  color: black;
  margin-top: 70px;
`;

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appRef = useRef(null);

  // useEffect(() => {
  //   const storedState = localStorage.getItem('slideEditorState');
  //   if (storedState) {
  //     dispatch({
  //       type: SET_STORED_STATE,
  //       payload: JSON.parse(storedState),
  //     });
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('slideEditorState', JSON.stringify(state));
  }, [state]);

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContext.Provider value={{ state, dispatch }}>
        <AppContainer ref={appRef}>
          <Title title={state.title} />
          <ElementList elements={state.elements} />
        </AppContainer>
        <ExportButtons appRef={appRef}/>
      </AppContext.Provider>
    </DndProvider>
  );
}

export default App;
