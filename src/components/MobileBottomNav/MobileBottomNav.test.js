import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import MobileBottomNav from './MobileBottomNav';

const { screen } = testingLibrary;

describe('MobileBottomNav', () => {
  it('renders links and the create listing button', () => {
    render(<MobileBottomNav isAuthenticated={false} currentPage="LandingPage" />);
    expect(screen.getByText('MobileBottomNav.home')).toBeInTheDocument();
    expect(screen.getByText('MobileBottomNav.browse')).toBeInTheDocument();
    expect(screen.getByText('MobileBottomNav.inbox')).toBeInTheDocument();
    expect(screen.getByText('MobileBottomNav.account')).toBeInTheDocument();
    expect(screen.getByLabelText('MobileBottomNav.createListing')).toBeInTheDocument();
  });

  it('hides the create listing button when not allowed', () => {
    render(
      <MobileBottomNav isAuthenticated currentPage="SearchPage" showCreateListingsLink={false} />
    );
    expect(screen.queryByLabelText('MobileBottomNav.createListing')).toBeNull();
  });

  it('reserves space at the bottom of the page while mounted', () => {
    const { unmount } = render(<MobileBottomNav isAuthenticated currentPage="LandingPage" />);
    expect(document.body.classList.contains('hasMobileBottomNav')).toBe(true);
    unmount();
    expect(document.body.classList.contains('hasMobileBottomNav')).toBe(false);
  });
});
