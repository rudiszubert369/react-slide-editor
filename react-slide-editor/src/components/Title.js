import styled from 'styled-components';
import PropTypes from 'prop-types';
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

Title.propTypes = {
  title: PropTypes.shape({
    value: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
  }).isRequired,
};

export default Title;
