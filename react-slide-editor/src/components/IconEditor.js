import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useIconNames from '../hooks/useIconNames';
import useHandleClickOutside from '../hooks/useHandleClickOutside';
import Spinner from './Spinner';


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

  /* Add scrollbar */
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

const INITIAL_ICONS_TO_SHOW = 100;
const CLOSE_ICON_NAME = 'close';

function IconEditor({ onIconSelect, onClose }) {
  const [icons, setIcons] = useState([]);
  const allIconNames = useIconNames();
  const containerRef = useRef(null);

  useHandleClickOutside(containerRef, onClose);

  useEffect(() => {
    const data = allIconNames.slice(0, INITIAL_ICONS_TO_SHOW);
    setIcons(data);
  }, [allIconNames]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container.scrollTop + container.offsetHeight >= container.scrollHeight) {
      if (icons.length !== allIconNames.length) {
        const nextIcons = allIconNames.slice(0, icons.length * 1.5);
        setIcons(nextIcons);
      }
    }
  }, [icons, allIconNames]);

  return (
    <>
      <Overlay />
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <span className="material-icons">{CLOSE_ICON_NAME}</span>
        </CloseButton>
        {!icons.length ? (
          <StyledIconEditor>
            <Spinner />
          </StyledIconEditor>
        ) : (
          <StyledIconEditor ref={containerRef} onScroll={handleScroll}>
            {icons.map((icon) => (
              <Icon key={icon} onClick={(e) => onIconSelect(e.target.innerText)}>
                <span className="material-icons">{icon}</span>
              </Icon>
            ))}
          </StyledIconEditor>
        )}
      </ModalContainer>
    </>
  );
}

IconEditor.propTypes = {
  onIconSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default IconEditor;
