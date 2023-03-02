import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import IconEditor from './IconEditor';
import { AppContext } from '../App';
import { EDIT_ICON } from '../actions/action-types.js';


const StyledIconContainer = styled.div`
  position: relative;

  &:hover .overlay {
    opacity: 0.5;
  }
  
  &:hover .edit-icon-button {
    display: block;
  }
`;

const StyledIcon = styled.span`
  font-size: 55px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: black;
  transition: opacity 0.2s ease-in-out;
`;

const EditIconButton = styled.button`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background-color: #333;
  color: white;
  font-size: 10px;
  line-height: 1;
  cursor: pointer;
  &:before {
    content: "\\270E";
  }
`;

function Icon( { icon, id }) {
  const { dispatch } = useContext(AppContext);
  const [showIconEditor, setShowIconEditor] = useState(false);

  const handleIconSelection = (selectedIcon) => {
    dispatch({ type: EDIT_ICON, elementId: id, icon: selectedIcon });
    setShowIconEditor(false);
  };

  const handleCloseIconEditor = () => {
    setShowIconEditor(false);
  };

  return (
    <StyledIconContainer>
      <StyledIcon className="material-icons">{icon}</StyledIcon>
      <Overlay className="overlay" />
      <EditIconButton className="edit-icon-button" onClick={() => setShowIconEditor(true)}>Pick Icon</EditIconButton>
      {showIconEditor && <IconEditor onIconSelect={handleIconSelection} onClose={handleCloseIconEditor} />}
    </StyledIconContainer>
  );
}

export default Icon;
