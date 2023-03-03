import styled from 'styled-components';
import InputElement from './InputElement';

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
`;

function Title({ title }) {
  return (
    <TitleContainer>
      <InputElement input={title} />
    </TitleContainer>
  );
}

export default Title;
