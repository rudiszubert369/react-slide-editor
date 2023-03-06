import React from 'react';
import { ScaleLoader } from 'react-spinners';
import styled from 'styled-components';

const StyledSpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Spinner() {
  return (
    <StyledSpinnerContainer>
      <ScaleLoader />
    </StyledSpinnerContainer>
  );
}

export default Spinner;