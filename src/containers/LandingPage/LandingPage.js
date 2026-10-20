import React, { useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useConfiguration } from '../../context/configurationContext';
import { useRouteConfiguration } from '../../context/routeConfigurationContext';
import { useIntl } from '../../util/reactIntl';
import { createResourceLocatorString } from '../../util/routes';
import { countryQueryParams } from '../../util/countries';
import { isScrollingDisabled } from '../../ducks/ui.duck';
import { getListingsById } from '../../ducks/marketplaceData.duck';

import { Page, LayoutSingleColumn } from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import { fetchFeaturedListings } from './LandingPage.duck';
import useReveal from './useReveal';
import SectionHero from './sections/SectionHero';
import SectionTrust from './sections/SectionTrust';
import SectionFeatured from './sections/SectionFeatured';
import SectionCountries from './sections/SectionCountries';
import SectionHowItWorks from './sections/SectionHowItWorks';
import SectionRoutes from './sections/SectionRoutes';
import SectionSell from './sections/SectionSell';
import SectionFinalCta from './sections/SectionFinalCta';

import css from './LandingPage.module.css';

/**
 * Coded landing page of the Nordkart marketplace.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.scrollingDisabled
 * @param {Array<Object>} props.listings featured listings
 * @param {string} props.country selected country tab ('All' or e.g. 'FI')
 * @param {boolean} props.inProgress featured listings are being fetched
 * @param {Object?} props.error error from fetching featured listings
 * @param {Function} props.onFetchFeaturedListings called with (country, config)
 * @returns {JSX.Element} landing page
 */
export const LandingPageComponent = props => {
  const {
    scrollingDisabled,
    listings = [],
    country,
    inProgress,
    error,
    onFetchFeaturedListings,
  } = props;
  const config = useConfiguration();
  const routeConfiguration = useRouteConfiguration();
  const history = useHistory();
  const intl = useIntl();
  const rootRef = useRef(null);

  useReveal(rootRef, { hiddenClassName: css.revealHidden, visibleClassName: css.revealVisible });

  const marketplaceName = config.marketplaceName;
  const title = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { marketplaceName });
  const description = intl.formatMessage({ id: 'LandingPage.schemaDescription' });

  const goToSearch = (searchParams = {}) => {
    history.push(createResourceLocatorString('SearchPage', routeConfiguration, {}, searchParams));
  };

  const handleKeywordSearch = keywords => {
    goToSearch(keywords ? { keywords } : {});
  };
  const handleCountrySearch = code => goToSearch(countryQueryParams(code));
  const handleSelectFeaturedCountry = code => onFetchFeaturedListings(code, config);

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    description,
    name: title,
  };

  return (
    <Page
      title={title}
      description={description}
      schema={schema}
      scrollingDisabled={scrollingDisabled}
    >
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root} ref={rootRef}>
          <SectionHero
            onKeywordSearch={handleKeywordSearch}
            onCountrySearch={handleCountrySearch}
          />
          <SectionTrust />
          <SectionFeatured
            listings={listings}
            country={country}
            inProgress={inProgress}
            error={error}
            onSelectCountry={handleSelectFeaturedCountry}
          />
          <SectionCountries />
          <SectionHowItWorks />
          <SectionRoutes />
          <SectionSell />
          <SectionFinalCta />
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

const mapStateToProps = state => {
  const { listingIds = [], country, inProgress, error } = state.LandingPage || {};
  return {
    scrollingDisabled: isScrollingDisabled(state),
    listings: getListingsById(state, listingIds),
    country,
    inProgress,
    error,
  };
};

const mapDispatchToProps = dispatch => ({
  onFetchFeaturedListings: (country, config) =>
    dispatch(fetchFeaturedListings({ country, config })),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LandingPageComponent);

export default LandingPage;
