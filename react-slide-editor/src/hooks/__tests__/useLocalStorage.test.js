import React, { renderHook } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';

beforeEach(() => {
  localStorage.clear();
});

describe('useLocalStorage', () => {
  it('should set initial value in localStorage', () => {
    const key = 'test-key';
    const initialValue = { test: 'value' };
    renderHook(() => useLocalStorage(key, initialValue));

    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue));
  });

  it('should return the stored value from localStorage', () => {
    const key = 'test-key';
    const initialValue = { test: 'value' };
    localStorage.setItem(key, JSON.stringify(initialValue));
    const { result } = renderHook(() => useLocalStorage(key, { test: 'default' }));

    expect(result.current[0]).toEqual(initialValue);
  });
});
