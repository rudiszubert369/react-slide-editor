import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { AppContext } from '../../providers/AppContextProvider';
import Title from '../Title';

const dispatch = jest.fn();
const MockAppContextProvider = ({ children }) => (
  <AppContext.Provider value={{ dispatch }}>{children}</AppContext.Provider>
);

describe('Title', () => {
  it('should render the title', () => {
    const title = {
      value: 'Test Title',
      inputType: 'text',
    };
    const { getByText } = render(
      <MockAppContextProvider>
        <Title title={title} />
      </MockAppContextProvider>
    );
    expect(getByText('Test Title')).toBeInTheDocument();
  });

  it('dispatches correct action when title value is changed', () => {
    const title = { value: 'Test Title', inputType: 'title' };
    const { getByDisplayValue } = render(
      <MockAppContextProvider>
        <Title title={title} />
      </MockAppContextProvider>
    );
    fireEvent.change(getByDisplayValue(title.value), { target: { value: 'New Title' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'EDIT_TITLE', title: { value: 'New Title', inputType: 'title' } });
  });
});