import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import useIconNames from '../hooks/useIconNames';

const StyledIconEditor = styled.div`
  position: absolute;
  top: 100px;
  overflow: auto;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  padding: 10px;
  width: 200px;
  background: white;

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
  font-size: 24px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
    border-radius: 50%;
  }
`;

const INITIAL_ICONS_TO_SHOW = 100;

function IconEditor({ onIconSelect, onClose }) {
  const [icons, setIcons] = useState([]);
  const allIconNames = useIconNames();
  const containerRef = useRef(null);

  useEffect(() => {
    const data = allIconNames.slice(0, INITIAL_ICONS_TO_SHOW);
    setIcons(data);

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [allIconNames, onClose]);

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
    <StyledIconEditor ref={containerRef} onScroll={handleScroll}>
      <CloseButton onClick={onClose}>
        <span className="material-icons">close</span>
      </CloseButton>
      {icons.map((icon) => (
        <Icon key={icon} onClick={(e) => onIconSelect(e.target.innerText)}>
          <span className="material-icons">{icon}</span>
        </Icon>
      ))}
    </StyledIconEditor>
  );
}

export default IconEditor;
