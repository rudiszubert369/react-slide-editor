import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Element from './Element';

const ElementListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 860px) {
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

ElementList.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      inputs: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          value: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};


export default ElementList;
