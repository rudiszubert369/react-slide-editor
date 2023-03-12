import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';
import InputElement from './InputElement';
import { AppContext } from '../providers/AppContextProvider';
import { moveElement } from '../store/actions/elementActions';
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

const SelectContainer = styled.div`
  margin-top: 8px;
`;

const SelectLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

const Select = styled.select`
  margin-left: 8px;
`;

const ToggleButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 8px;
    background-color: transparent;
    color: #555;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
`;

function Element({ element, index }) {
  const [drag, drop, isDragging] = useDragAndDrop(element, index);
  const { dispatch, state } = useContext(AppContext);
  const [showSelectContainer, setShowSelectContainer] = useState(false);

  const handleIndexChange = (e) => {
    const newIdx = parseInt(e.target.value);
    dispatch(
      moveElement(index, newIdx)
    );
    setShowSelectContainer(false);
  };

  const handleToggleClick = () => {
    setShowSelectContainer(true);
  };

  function renderDropdownOptions() {
    return Array.from(Array(state.elements.length).keys()).map((idx) => (
      <option key={idx} value={idx}>{idx + 1}</option>
    ));
  }

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
        {showSelectContainer ? (
          <SelectContainer>
            <SelectLabel>Icon position:</SelectLabel>
            <Select value={index} onChange={handleIndexChange}>
              {renderDropdownOptions()}
            </Select>
          </SelectContainer>
        ) : (
          <ToggleButton onClick={handleToggleClick}>Change Element Order</ToggleButton>
        )}
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
