import React, { useState, useEffect, useRef } from 'react';
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

function IconEditor({ onIconSelect }) {
  const [icons, setIcons] = useState([]);
  const allIconNames = useIconNames();
  const containerRef = useRef(null);

  useEffect(() => {
    const data = allIconNames.slice(0, 100);//TODO take out 100 to const
    setIcons(data);
  }, [allIconNames]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollTop + container.offsetHeight >= container.scrollHeight) {//TODO dont do it at all of allionnames are loger than list. is slice really a good method? 
      const nextIcons = allIconNames.slice(0, icons.length * 2);
      setIcons(nextIcons);
    }
  };

  return (
    <StyledIconEditor ref={containerRef} onScroll={handleScroll}>
      {icons.map((icon) => (
        <Icon key={icon} onClick={(e) => onIconSelect(e.target.innerText)}>
          <span className="material-icons">{icon}</span>
        </Icon>
      ))}
    </StyledIconEditor>
  );
}

export default IconEditor;