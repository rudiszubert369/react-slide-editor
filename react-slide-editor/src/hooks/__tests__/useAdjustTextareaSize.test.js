import React from 'react';
import { render } from '@testing-library/react';
import { useAdjustTextareaSize } from '../useAdjustTextareaSize';
import { TEXT_MIN_HEIGHT } from '../../constants';


describe('useAdjustTextareaSize', () => {
  it('should adjust textarea height', () => {
    const value = { inputType: 'text' };
    const ref = { current: document.createElement('textarea') };
    const spy = jest.spyOn(ref.current.style, 'setProperty');
    const Component = () => {
      useAdjustTextareaSize(ref, value);
      return <textarea ref={ref} />;
    };
    render(<Component />);
    expect(ref.current.style.height).toBe(`${TEXT_MIN_HEIGHT}px`);
    spy.mockRestore();
  });
});
