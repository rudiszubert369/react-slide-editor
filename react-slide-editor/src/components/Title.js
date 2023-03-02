import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App';
import { EDIT_TITLE } from '../actions/action-types.js';
import { adjustTextareaHeight } from '../utils/adjustTextareaHeight';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

const TextArea = styled.textarea`
  margin-top: 4px;
  border: none;
  background: none;
  font-size: 16px;
  color: inherit;
  padding: 0;
  outline: none;
  text-align: center;
  font-weight: bold;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  resize: none;
`;

function Title({ title }) {
  const { dispatch } = useContext(AppContext);
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight(textareaRef);
  }, [title]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    dispatch({ type: EDIT_TITLE, title: value });
  };

  return (
    <TitleContainer>
      <TextArea ref={textareaRef} onChange={handleInputChange} value={title}></TextArea>
    </TitleContainer>
  );
}

export default Title;
