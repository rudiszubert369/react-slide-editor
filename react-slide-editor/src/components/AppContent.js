import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DndWrapper from './DndWrapper';
import Title from './Title';
import ElementList from './ElementList';
import ExportButtons from './ExportButtons';

const AppContainer = styled.div`
  color: black;
  margin-top: 70px;
`;

function AppWrapper({ appRef, title, elements }) {
  return (
    <DndWrapper>
      <AppContainer ref={appRef}>
        <Title title={title} />
        <ElementList elements={elements} />
      </AppContainer>
      <ExportButtons appRef={appRef} />
    </DndWrapper>
  );
}

AppWrapper.propTypes = {
  appRef: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  elements: PropTypes.array.isRequired,
};

export default AppWrapper;

