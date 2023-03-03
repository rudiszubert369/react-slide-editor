import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import handleExportToPDF from '../utils/handleExportToPDF';
import handleExportToHTML from '../utils/handleExportToHTML';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;

  button {
    background-color: #771482;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #580761;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    
    button {
      margin-top: 10px;
      margin-right: 0;
    }
  }
`;

function ExportButtons({ appRef }) {
  return (
    <ButtonContainer>
      <button onClick={() => handleExportToPDF(appRef)}>Export to PDF</button>
      <button onClick={() => handleExportToHTML(appRef)}>Export to HTML</button>
    </ButtonContainer>
  );
}

ExportButtons.propTypes = {
  appRef: PropTypes.object.isRequired,
};

export default ExportButtons;
