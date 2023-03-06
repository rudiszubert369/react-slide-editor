import React from 'react';
import { renderHook } from '@testing-library/react';
import useHandleClickOutside from '../useHandleClickOutside';

describe('useClickOutside', () => {
  it('should call callback when clicking outside the ref element', () => {
    const callback = jest.fn();
    const ref = { current: document.createElement('div') };
    const { unmount } = renderHook(() => useHandleClickOutside(ref, callback));

    const event = new MouseEvent('mousedown', { bubbles: true });
    document.dispatchEvent(event);

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
  });
});

