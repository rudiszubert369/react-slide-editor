import React, { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AppContext } from '../providers/AppContextProvider';
import { moveElement } from '../store/actions/elementActions';


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
      dispatch(
        moveElement(dragIndex, hoverIndex)
      );
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
