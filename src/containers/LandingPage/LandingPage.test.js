import React from 'react';
import '@testing-library/jest-dom';

import { createListing } from '../../util/testData';
import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import { LandingPageComponent } from './LandingPage';
import reducer, { fetchFeaturedListings, ALL_COUNTRIES } from './LandingPage.duck';

const { screen, userEvent } = testingLibrary;

const noop = () => null;

describe('LandingPage', () => {
  it('renders the Nordkart sections', () => {
    render(
      <LandingPageComponent
        listings={[]}
        country={ALL_COUNTRIES}
        inProgress={false}
        error={null}
        onFetchFeaturedListings={noop}
      />
    );

    expect(screen.getByText('LandingPage.hero.subtitle')).toBeInTheDocument();
    expect(screen.getByText('LandingPage.featured.title')).toBeInTheDocument();
    expect(screen.getByText('LandingPage.countries.title')).toBeInTheDocument();
    expect(screen.getByText('LandingPage.how.title')).toBeInTheDocument();
    expect(screen.getByText('LandingPage.sell.title')).toBeInTheDocument();
    expect(screen.getByText('LandingPage.finalCta.title')).toBeInTheDocument();
    // No listings yet
    expect(screen.getByText('LandingPage.featured.noListings')).toBeInTheDocument();
  });

  it('renders featured listings and fetches listings when a country tab is clicked', async () => {
    const user = userEvent.setup();
    const onFetchFeaturedListings = jest.fn();
    const listing = createListing('listing1', { title: 'Birch lounge chair' });

    render(
      <LandingPageComponent
        listings={[listing]}
        country={ALL_COUNTRIES}
        inProgress={false}
        error={null}
        onFetchFeaturedListings={onFetchFeaturedListings}
      />
    );

    expect(screen.getByText('Birch lounge chair')).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    // "All countries" + 5 countries
    expect(tabs).toHaveLength(6);
    await user.click(tabs[1]);
    expect(onFetchFeaturedListings).toHaveBeenCalledWith('FI', expect.any(Object));
  });

  it('shows an error message if listings could not be loaded', () => {
    render(
      <LandingPageComponent
        listings={[]}
        country={ALL_COUNTRIES}
        inProgress={false}
        error={{ type: 'error', name: 'Test' }}
        onFetchFeaturedListings={noop}
      />
    );
    expect(screen.getByText('LandingPage.featured.error')).toBeInTheDocument();
  });
});

describe('LandingPage duck', () => {
  const pending = (country, requestId) => ({
    type: fetchFeaturedListings.pending.type,
    meta: { arg: { country }, requestId },
  });
  const fulfilled = (listingIds, requestId) => ({
    type: fetchFeaturedListings.fulfilled.type,
    payload: { listingIds },
    meta: { arg: {}, requestId },
  });

  it('stores the selected country and listing ids', () => {
    let state = reducer(undefined, pending('fi', 'r1'));
    expect(state.country).toEqual('FI');
    expect(state.inProgress).toBe(true);

    state = reducer(state, fulfilled(['id1'], 'r1'));
    expect(state.listingIds).toEqual(['id1']);
    expect(state.inProgress).toBe(false);
  });

  it('ignores responses of outdated requests', () => {
    let state = reducer(undefined, pending('fi', 'r1'));
    state = reducer(state, pending('se', 'r2'));
    state = reducer(state, fulfilled(['old'], 'r1'));
    expect(state.listingIds).toEqual([]);
    expect(state.inProgress).toBe(true);

    state = reducer(state, fulfilled(['new'], 'r2'));
    expect(state.listingIds).toEqual(['new']);
  });
});
