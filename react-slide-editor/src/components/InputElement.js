import React, { useContext, useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { AppContext } from '../providers/AppContextProvider';
import { useAdjustTextareaSize } from '../hooks/useAdjustTextareaSize';
import { INPUT_TYPE_TITLE, INPUT_TYPE_TEXT, INPUT_TYPE_ADDITIONAL_TEXT,  } from '../constants';
import { editTitle, editInput } from '../store/actions/elementActions';

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  justify-content: center;
  flex-basis: 100%;

  @media (max-width: 768px) {
    max-width: 350px;
  }

  @media (max-width: 375px) {
    max-width: 280px;
  }
`;

const InputField = styled.textarea`
  margin-top: 4px;
  font-family: roboto, sans-serif;
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
      font-size: 12px;
    `}
  ${({ inputType }) =>
    inputType === 'title' &&
    css`
      font-weight: bold;
      background-color: none;
      font-size: 22px;
  `}
`;

function InputElement({ input, elementId }) {
  const { dispatch } = useContext(AppContext);
  const textareaRef = useRef(null);

  useAdjustTextareaSize(textareaRef, input);

  const handleInputChange = useCallback(
    (event) => {
      const { value } = event.target;
      if (input.inputType === INPUT_TYPE_TITLE) {
        dispatch(
          editTitle({ ...input, value })
        );
      } else {
        dispatch(
          editInput(elementId, input.id, value)
        );
      }
    },
    [dispatch, elementId, input]
  );

  return (
    <InputContainer>
      <InputField
        ref={textareaRef}
        id={`input-${elementId}-${input.id}`}
        type="text"
        value={input.value}
        onChange={handleInputChange}
        inputType={input.inputType}
        aria-label={input.inputType === INPUT_TYPE_TITLE ? 'Title input' : 'Text input'}
      />
    </InputContainer>
  );
}

InputElement.propTypes = {
  input: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string.isRequired,
    inputType: PropTypes.oneOf([INPUT_TYPE_TITLE, INPUT_TYPE_TEXT, INPUT_TYPE_ADDITIONAL_TEXT]).isRequired,
  }).isRequired,
  elementId: PropTypes.number
};

export default InputElement;
