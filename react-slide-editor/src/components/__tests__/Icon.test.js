import React from 'react';
import { render } from '@testing-library/react';
import Icon from '../Icon';
import { AppContext } from '../../providers/AppContextProvider';

const dispatch = jest.fn();
const MockAppContextProvider = ({ children }) => (
  <AppContext.Provider value={{ dispatch }}>{children}</AppContext.Provider>
);

describe('Icon', () => {
  it('should render the correct icon', () => {
    const icon = 'check';
    const id = 1;
    const { getByText } = render(
      <MockAppContextProvider value={{ dispatch }}>
        <Icon icon={icon} id={id} />
      </MockAppContextProvider>
    );
    expect(getByText(icon)).toBeInTheDocument();
  });
});
