import React, { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AppContext } from '../App';
import { MOVE_ELEMENT } from '../actions/action-types.js';

function useDragAndDrop(element, index) {
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

  const handleDrop = (item) => {
    if (item.id !== element.id) {
      const dragIndex = item.index;
      const hoverIndex = index;
      dispatch({ type: MOVE_ELEMENT, payload: { sourceIndex: dragIndex, destinationIndex: hoverIndex } });
      item.index = hoverIndex;
    }
  };

  const [, drop] = useDrop({
    accept: 'element',
    hover: handleDrop,
  });

  return [drag, drop, isDragging];
}

export default useDragAndDrop;
