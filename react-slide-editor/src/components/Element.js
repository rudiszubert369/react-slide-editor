import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';
import InputElement from './InputElement';
import useDragAndDrop from '../hooks/useDragAndDrop';
import { ICON_DRAG_INDICATOR, ICONS_CLASS_NAME } from '../constants';

const ElementContainer = styled.div`
  padding: 8px;
  margin: 30px;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }

  &:hover span {
    opacity: 1;
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
`;

const DragIndicator = styled.span`
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  cursor: grab;
`;

function Element({ element, index }) {
  const [drag, drop, isDragging] = useDragAndDrop(element, index);

  return (
    <ElementContainer isDragging={isDragging} ref={drag}>
      <DragIndicator className={ICONS_CLASS_NAME}>{ICON_DRAG_INDICATOR}</DragIndicator>
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
