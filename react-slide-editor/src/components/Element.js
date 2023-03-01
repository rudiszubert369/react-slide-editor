import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import { AppContext } from '../App';
import Icon from './Icon';

const ElementContainer = styled.div`
  border: 1px solid black;
  padding: 8px;
`;

const ElementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ElementInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-weight: bold;
`;

const InputField = styled.input`
  margin-top: 4px;
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
    hover(item, monitor) {
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
    <ElementContainer ref={drop} style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: isOver ? 'lightgrey' : 'white' }}>
      <ElementHeader ref={drag}>
        <div>{element.name}</div>
        <IconContainer>
          <Icon icon={element.icon} id={element.id} />
        </IconContainer>
        <div>Drag to reorder</div>
      </ElementHeader>
      <ElementInputs>
        {element.inputs.map((input) => (
          <InputContainer key={input.id}>
            <InputLabel htmlFor={`input-${element.id}-${input.id}`}>Input {input.id}</InputLabel>
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
