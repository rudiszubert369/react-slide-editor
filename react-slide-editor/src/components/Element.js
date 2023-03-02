import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import { AppContext } from '../App';
import Icon from './Icon';

const ElementContainer = styled.div`
  border: 1px solid black;
  padding: 8px;
  border: 1px solid black;
  padding: 8px;
  opacity: (isDragging ? 0 : 1)};
  background-color: (isOver ? 'lightgrey' : 'white')};
  transition: opacity 0.2s ease-in-out;
`;//TODO does bg color even work

const ElementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; 
`;

const ElementInputs = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const InputField = styled.input`
  margin-top: 4px;
  border: none;
  background: none;
  font-size: 16px;
  color: inherit;
  padding: 0;
  outline: none;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

function Element({ element, index }) {
  const { dispatch } = useContext(AppContext);

  const [{ isDragging }, drag] = useDrag({
    type: 'element',
    item: () => {
      return { id: element.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'element',
    hover(item) {
      if (item.id !== element.id) {
        const dragIndex = item.index;
        const hoverIndex = index;
        dispatch({ type: 'moveElement', payload: { sourceIndex: dragIndex, destinationIndex: hoverIndex } });
        item.index = hoverIndex;
      }
    },
  });

  const handleInputChange = (inputId) => (event) => {
    const { value } = event.target;
    dispatch({ type: 'editInput', elementId: element.id, inputId, value });
  };

  return (
    <ElementContainer ref={drop}>
      <ElementHeader ref={drag}>
        <IconContainer>
          <Icon icon={element.icon} id={element.id} />
        </IconContainer>
        <span className="material-icons">back_hand</span>
      </ElementHeader>
      <ElementInputs>
        {element.inputs.map((input) => (
          <InputContainer key={input.id}>
            <InputField
              id={`input-${element.id}-${input.id}`}
              type="text"
              value={input.value}
              onChange={handleInputChange(input.id)}
            />
          </InputContainer>
        ))}
      </ElementInputs>
    </ElementContainer>
  );
}

export default Element;
