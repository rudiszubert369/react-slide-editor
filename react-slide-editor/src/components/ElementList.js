import React from 'react';
import Element from './Element';

function ElementList({ elements }) {
  return (
    <div>
      {elements.map((element, index) => (
        <Element key={element.id} element={element} index={index} />
      ))}
    </div>
  );
}

export default ElementList;
