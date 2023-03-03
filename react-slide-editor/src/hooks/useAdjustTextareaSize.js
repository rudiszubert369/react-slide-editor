import React, { useEffect } from 'react';
const TEXT_MAX_WIDTH = 200;
const TEXT_INIT_WIDTH = 2;


export function useAdjustTextareaSize(ref, value) {
  useEffect(() => {
    if (ref.current) {
      
      // Adjust height
      ref.current.style.height = '5px';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      console.log(ref.current.scrollHeight);

      //Adjust width
      const lines = ref.current.value.split('\n');
      const fontSize = parseInt(getComputedStyle(ref.current).fontSize);
      const maxLineWidth = lines.reduce((max, line) => Math.max(max, line.length * fontSize * 0.6), 0);
      const inputWidth = Math.min(maxLineWidth + TEXT_INIT_WIDTH, TEXT_MAX_WIDTH);
      ref.current.style.width = `${inputWidth}px`;
    }
  }, [value, ref]);
}

export default useAdjustTextareaSize;
