import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IconPicker from '../IconPicker';

describe('IconPicker', () => {
  const onIconSelect = jest.fn();
  const onClose = jest.fn();

  it('should call onClose when the close button is clicked', () => {
    render(<IconPicker onIconSelect={onIconSelect} onClose={onClose} />);
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
