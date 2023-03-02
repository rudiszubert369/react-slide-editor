import React, { useEffect, useReducer, createContext } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Title from './components/Title';
import ElementList from './components/ElementList';
import { initialState, reducer } from './reducer';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedState = localStorage.getItem('slideEditorState');
    if (storedState) {
      dispatch({
        type: 'setStoredState',
        payload: JSON.parse(storedState),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('slideEditorState', JSON.stringify(state));
  }, [state]);

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContext.Provider value={{ state, dispatch }}>
        <AppContainer>
          <Title title={state.title} />
          <ElementList elements={state.elements} />
        </AppContainer>
      </AppContext.Provider>
    </DndProvider>
  );
}

export default App;
