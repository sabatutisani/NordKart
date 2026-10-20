import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render } from '../../util/testHelpers';

import Flag from './Flag';

describe('Flag', () => {
  it('renders a decorative flag for a known country', () => {
    const { container } = render(<Flag code="fi" size={24} />);
    const root = container.firstChild;
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).toHaveStyle({ width: '24px', height: '24px' });
  });

  it('renders an accessible flag when title is given', () => {
    const { getByRole } = render(<Flag code="GE" title="Georgia" />);
    expect(getByRole('img', { name: 'Georgia' })).toBeInTheDocument();
  });

  it('renders nothing for an unknown country', () => {
    const { container } = render(<Flag code="XX" />);
    expect(container.firstChild).toBeNull();
  });
});
