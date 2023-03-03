import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';
import InputElement from './InputElement';
import useDragAndDrop from '../hooks/useDragAndDrop';

const ElementContainer = styled.div`
  padding: 8px;
  margin: 30px;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
  }

  ${({ isDragging }) =>
    isDragging &&
    `
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
  `}
`;

const ElementInputs = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

function Element({ element, index }) {
  const [drag, drop, isDragging] = useDragAndDrop(element, index);

  return (
    <ElementContainer ref={drag} isDragging={isDragging}>
      <IconContainer ref={drop}>
        <Icon icon={element.icon} id={element.id} />
      </IconContainer>
      <ElementInputs>
        {element.inputs.map((input) => (
          <InputElement key={input.id} input={input} elementId={element.id} />
        ))}
      </ElementInputs>
    </ElementContainer>
  );
}

Element.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    inputs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
        inputType: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Element;
