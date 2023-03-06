import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_FAMILY_PRIMARY, INPUT_MAX_CHARACTERS } from '../constants';

const CharacterCountContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CharacterCountText = styled.span`
  font-family: ${FONT_FAMILY_PRIMARY};
  position: absolute;
  display: inline-block;
  bottom: -18px;
  left: 7px;
  transform: translateX(-50%);
  font-size: 12px;
  color: rgba(85, 84, 84, 84);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2px 6px;
  border-radius: 4px;
  width: 100%;
`;

const CharacterCount = ({ charCount }) => {
  const exceededCharLimit = charCount > INPUT_MAX_CHARACTERS;
  const recommendedMsg = exceededCharLimit ? ` Recommended max characters: ${INPUT_MAX_CHARACTERS}` : '';

  return (
    <CharacterCountContainer>
      <CharacterCountText>{`${charCount}/${INPUT_MAX_CHARACTERS}${recommendedMsg}`}</CharacterCountText>
    </CharacterCountContainer>
  );
};

CharacterCount.propTypes = {
  charCount: PropTypes.number.isRequired
};

export default CharacterCount;
