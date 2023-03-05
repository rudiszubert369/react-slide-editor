import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import IconPicker from './IconPicker';
import { AppContext } from '../providers/AppContextProvider';
import { editIcon } from '../store/actions/elementActions';
import { ICONS_CLASS_NAME } from '../constants';

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
    dispatch(
      editIcon(id, selectedIcon)
    );
    setShowIconEditor(false);
  };

  const handleCloseIconEditor = () => {
    setShowIconEditor(false);
  };

  return (
    <StyledIconContainer>
      <StyledIcon className={ICONS_CLASS_NAME}>{icon}</StyledIcon>
      <Overlay className="overlay" />
      <EditIconButton className="edit-icon-button" onClick={() => setShowIconEditor(true)}>Pick Icon</EditIconButton>
      {showIconEditor && <IconPicker onIconSelect={handleIconSelection} onClose={handleCloseIconEditor} />}
    </StyledIconContainer>
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Icon;
