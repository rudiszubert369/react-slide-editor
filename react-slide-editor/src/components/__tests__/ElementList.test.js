import React from 'react';
import { render } from '@testing-library/react';
import ElementList from '../ElementList';

test('renders ElementList without crashing', () => {
  const elements = [];
  render(<ElementList elements={elements} />);
});