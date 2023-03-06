import React from 'react';
import { render, screen } from '@testing-library/react';
import ExportButtons from '../ExportButtons';

describe('ExportButtons', () => {
  it('should render the buttons', () => {
    const appRef = { current: {} };
    render(<ExportButtons appRef={appRef} />);
    const pdfButton = screen.getByText('Export to PDF');
    const htmlButton = screen.getByText('Export to HTML');
    expect(pdfButton).toBeInTheDocument();
    expect(htmlButton).toBeInTheDocument();
  });
});
