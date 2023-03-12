import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputElement from '../InputElement';
import { AppContext } from '../../providers/AppContextProvider';

const dispatch = jest.fn();
const MockAppContextProvider = ({ children }) => (
  <AppContext.Provider value={{ dispatch }}>{children}</AppContext.Provider>
);

describe('InputElement', () => {
  it('renders input element without error', () => {
    render(
      <MockAppContextProvider value={{ dispatch }}>
        <InputElement input={{id: 1, value: '', inputType: 'text'}} />
      </MockAppContextProvider>
    );
  });

  it('renders input value correctly', () => {
    const input = { id: 1, value: 'Test Input', inputType: 'text' };
    const { getByDisplayValue } = render(
      <MockAppContextProvider value={{ dispatch }}>
        <InputElement input={input} />
      </MockAppContextProvider>

    );
    expect(getByDisplayValue(input.value)).toBeInTheDocument();
  });

  it('calls handleInputChange when input value is changed', () => {
    const input = { id: 1, value: 'Test Input', inputType: 'text' };
    const { getByDisplayValue } = render(
      <MockAppContextProvider value={{ dispatch }}>
        <InputElement input={input} />
      </MockAppContextProvider>
    );
    fireEvent.change(getByDisplayValue(input.value), { target: { value: 'New Value' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'EDIT_INPUT', elementId: undefined, inputId: input.id, value: 'New Value' });
  });
});