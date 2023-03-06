import React from 'react';
import { render } from '@testing-library/react';
import AppContent from '../AppContent';

test('throws an error if the required props are not provided', () => {
  const consoleError = console.error;
  console.error = jest.fn();
  
  expect(() => render(<AppContent />)).toThrow();
  
  console.error = consoleError;
});
