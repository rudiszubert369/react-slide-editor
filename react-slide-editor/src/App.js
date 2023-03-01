import React, { useReducer, createContext } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Element from './components/Element';
import { initialState, reducer } from './reducer';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContext.Provider value={{ state, dispatch }}>
        <AppContainer>
          {state.map((element, index) => (
            <Element key={element.id} element={element} index={index} />
          ))}
        </AppContainer>
      </AppContext.Provider>
    </DndProvider>
  );
}

export default App;
