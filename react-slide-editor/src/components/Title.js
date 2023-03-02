import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

const InputField = styled.input`
  margin-top: 4px;
  border: none;
  background: none;
  font-size: 16px;
  color: inherit;
  padding: 0;
  outline: none;
  text-align: center;
`;

function Title({ title }) {
  const [value, setValue] = useState(title);
  const { dispatch } = useContext(AppContext);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setValue(value);
    dispatch({ type: 'editTitle', title: value });
  };

  return (
    <TitleContainer>
      <InputField onChange={handleInputChange} value={value}></InputField>
    </TitleContainer>
  );
}

export default Title;