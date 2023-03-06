import React, { useEffect } from 'react';
import { adjustTextareaWidth } from '../utils/utils';
import { TEXT_MIN_HEIGHT } from '../constants';

export function useAdjustTextareaSize(ref, value) {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = '5px';//Reset height
      ref.current.style.height = `${ref.current.scrollHeight + TEXT_MIN_HEIGHT}px`;

      adjustTextareaWidth(ref.current, value.inputType);
    }
  }, [value, ref]);
}

export default useAdjustTextareaSize;
