import React, { useEffect } from 'react';
import { TEXT_MAX_WIDTH, TITLE_MAX_WIDTH, TEXT_MIN_WIDTH, INPUT_TYPE_TITLE } from '../constants';

function adjustTextareaWidth(ref, type) {
  const maxWidth = type === INPUT_TYPE_TITLE ? TITLE_MAX_WIDTH : TEXT_MAX_WIDTH;
  const lines = ref.value.split('\n');
  const fontSize = parseInt(getComputedStyle(ref).fontSize);
  const maxLineWidth = lines.reduce((max, line) => Math.max(max, line.length * fontSize * 0.6), 0);//*0.6 is a result of trial and error of trying to match design
  const inputWidth = Math.min(maxLineWidth + TEXT_MIN_WIDTH, maxWidth);
  ref.style.width = `${inputWidth}px`;
}

export function useAdjustTextareaSize(ref, value) {
  useEffect(() => {
    if (ref.current) {
      // Adjust height
      ref.current.style.height = '5px';
      ref.current.style.height = `${ref.current.scrollHeight + 3}px`;

      // Adjust width
      adjustTextareaWidth(ref.current, value.inputType);
    }
  }, [value, ref]);
}

export default useAdjustTextareaSize;
