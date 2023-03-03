import React, { useEffect } from 'react';

const TEXT_MAX_WIDTH = 210;
const TITLE_MAX_WIDTH = 600;
const TEXT_INIT_WIDTH = 2;

function adjustTextareaWidth(ref, type) {
  const maxWidth = type === 'title' ? TITLE_MAX_WIDTH : TEXT_MAX_WIDTH;
  const lines = ref.value.split('\n');
  const fontSize = parseInt(getComputedStyle(ref).fontSize);
  const maxLineWidth = lines.reduce((max, line) => Math.max(max, line.length * fontSize * 0.6), 0);
  const inputWidth = Math.min(maxLineWidth + TEXT_INIT_WIDTH, maxWidth);
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
