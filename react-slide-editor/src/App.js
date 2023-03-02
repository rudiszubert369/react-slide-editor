import React, { useEffect, useReducer, createContext, useRef } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Title from './components/Title';
import ElementList from './components/ElementList';
import { initialState, reducer } from './reducer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';





const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appRef = useRef(null);

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

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    const app = appRef.current;
  
    // Use html2canvas to capture a screenshot of the app
    html2canvas(app).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
  
      // Calculate dimensions of PDF page (assuming A4 paper size)
      const pdfWidth = 210;
      const pdfHeight = 297;
      const appWidth = app.offsetWidth;
      const appHeight = app.offsetHeight;
      const scaleFactor = Math.min(pdfWidth / appWidth, pdfHeight / appHeight);
      const scaledWidth = appWidth * scaleFactor;
      const scaledHeight = appHeight * scaleFactor;
  
      // Add the app screenshot to the PDF document
      doc.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
  
      // Save the PDF document
      doc.save('slide.pdf');
    });
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContext.Provider value={{ state, dispatch }}>
        <AppContainer ref={appRef}>
          <Title title={state.title} />
          <ElementList elements={state.elements} />
        </AppContainer>
        <button onClick={handleExportToPDF}>Export to PDF</button>
      </AppContext.Provider>
    </DndProvider>
  );
}

export default App;
