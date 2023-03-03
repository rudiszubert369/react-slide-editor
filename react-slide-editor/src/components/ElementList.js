import React from 'react';
import styled from 'styled-components';
import Element from './Element';

const ElementListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

function ElementList({ elements }) {
  return (
    <ElementListContainer>
      {elements.map((element, index) => (
        <Element key={element.id} element={element} index={index} />
      ))}
    </ElementListContainer>
  );
}

export default ElementList;
