import React, { useContext, useRef } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../App';
import { EDIT_INPUT, EDIT_TITLE } from '../actions/action-types.js';
import { useAdjustTextareaSize } from '../hooks/useAdjustTextareaSize';

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  justify-content: center;
  flex-basis: 100%;
`;

const InputField = styled.textarea`
  margin-top: 4px;
  border: none;
  background: none;
  font-size: 16px;
  color: inherit;
  padding: 0;
  outline: none;
  text-align: center;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  resize: none;
  ${({ inputType }) =>
    inputType === 'text' &&
    css`
      font-weight: bold;
      background-color: #a492ab;
    `}
  ${({ inputType }) =>
    inputType === 'additionalText' &&
    css`
      font-weight: normal;
      background-color: none;
      font-size: 14px;
    `}
  ${({ inputType }) =>
    inputType === 'title' &&
    css`
      font-weight: bold;
      background-color: none;
      font-size: 26px;
  `}
`;

function InputElement({ input, elementId }) {
  const { dispatch } = useContext(AppContext);
  const textareaRef = useRef(null);

  useAdjustTextareaSize(textareaRef, input.value);

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (input.inputType === 'title') {
      dispatch({ type: EDIT_TITLE, title: { ...input, value } });
    } else {
      dispatch({ type: EDIT_INPUT, elementId, inputId: input.id, value });
    }
  };

  return (
    <InputContainer>
      <InputField
        ref={textareaRef}
        id={`input-${elementId}-${input.id}`}
        type="text"
        value={input.value}
        onChange={handleInputChange}
        inputType={input.inputType}
      />
    </InputContainer>
  );
}

export default InputElement;
