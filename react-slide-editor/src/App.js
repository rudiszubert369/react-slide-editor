import React, { useEffect, useReducer, createContext, useRef } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Title from './components/Title';
import ElementList from './components/ElementList';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { initialState, reducer } from './reducer';
import { SET_STORED_STATE } from './actions/action-types.js';

const AppContainer = styled.div`
  color:black;
`;

export const AppContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appRef = useRef(null);

  useEffect(() => {
    const storedState = localStorage.getItem('slideEditorState');
    if (storedState) {
      dispatch({
        type: SET_STORED_STATE,
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

  const handleExportToHTML = () => {
    const app = appRef.current;
  
    // Get the outer HTML of the app container
    const htmlContent = app.outerHTML;
  
    // Create a data URI from the HTML content
    const dataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
  
    // Create a download link and simulate a click to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUri;
    downloadLink.download = 'slide.html';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContext.Provider value={{ state, dispatch }}>
        <AppContainer ref={appRef}>
          <Title title={state.title} />
          <ElementList elements={state.elements} />
        </AppContainer>
        <button onClick={handleExportToPDF}>Export to PDF</button>
        <button onClick={handleExportToHTML}>Export to HTML</button>

      </AppContext.Provider>
    </DndProvider>
  );
}

export default App;
