import React, { useContext, useState } from 'react';
import IconEditor from './IconEditor';
import { AppContext } from '../App';

function Icon( { icon, id }) {
  const { dispatch } = useContext(AppContext);

  const [showIconEditor, setShowIconEditor] = useState(false);

  const handleIconSelection = (selectedIcon) => {
    dispatch({ type: 'editIcon', elementId: id, icon: selectedIcon });
    setShowIconEditor(false);
  };

  return (
    <>
      <span className="material-icons">{icon}</span>
      <button onClick={() => setShowIconEditor(!showIconEditor)}>Pick Icon</button>
      {showIconEditor && <IconEditor onIconSelect={handleIconSelection} />}
    </>
  );
}

export default Icon;