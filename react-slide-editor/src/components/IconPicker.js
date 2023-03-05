import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useHandleClickOutside from '../hooks/useHandleClickOutside';
import Spinner from './Spinner';
import { ICONS_CLASS_NAME, ICON_CLOSE } from '../constants';
import useIconNames from '../hooks/useIconNames';

const StyledIconEditor = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  overflow: auto;
  height: 300px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 20px;
  width: 300px;
  background: white;
  border-radius: 10px;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 3px;
  }
`;

const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
    border-radius: 15%;
  }

  .material-icons {
    font-size: 40px;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 10px;
  right: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  z-index: 999999;

  &:hover {
    background-color: #f1f1f1;
    border-radius: 50%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  pointer-events: none;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  width: 350px;
  height: 350px;
  overflow: hidden;
`;



function IconPicker({ onIconSelect, onClose }) {
  const { icons, isLoading } = useIconNames();

  const containerRef = useRef(null);
  useHandleClickOutside(containerRef, onClose);

  return (
    <>
      <Overlay />
      <ModalContainer>
        <CloseButton onClick={onClose} aria-label="close">
          <span className={ICONS_CLASS_NAME}>{ICON_CLOSE}</span>
        </CloseButton>
        {isLoading ? (
          <StyledIconEditor>
            <Spinner />
          </StyledIconEditor>
        ) : (
          <StyledIconEditor ref={containerRef}>
            {icons.map((icon, index) => (
              <Icon key={`${icon}-${index}`} onClick={(e) => onIconSelect(e.target.innerText)}>
                <span 
                  className={ICONS_CLASS_NAME}
                  role="button"
                  aria-label="Change icon"
                >
                  {icon}
                </span>
              </Icon>
            ))}
          </StyledIconEditor>
        )}
      </ModalContainer>
    </>
  );
}

IconPicker.propTypes = {
  onIconSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IconPicker;
