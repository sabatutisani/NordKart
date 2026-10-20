import React from 'react';
import classNames from 'classnames';

import { FormattedMessage } from '../../../util/reactIntl';
import { COUNTRIES } from '../../../util/countries';

import { ListingCard, NamedLink } from '../../../components';

import { ALL_COUNTRIES } from '../LandingPage.duck';

import css from './SectionFeatured.module.css';

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TABS = [ALL_COUNTRIES, ...COUNTRIES.map(c => c.code)];

/**
 * "Featured this week": real listings with country tabs.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.listings listing entities
 * @param {string} props.country selected tab ('All' or country code)
 * @param {boolean} props.inProgress listings are being fetched
 * @param {Object?} props.error fetch error
 * @param {Function} props.onSelectCountry called with selected tab value
 * @returns {JSX.Element} featured listings section
 */
const SectionFeatured = props => {
  const { listings = [], country = ALL_COUNTRIES, inProgress, error, onSelectCountry } = props;

  const renderSizes = [
    '(max-width: 767px) 76vw',
    '(max-width: 1023px) 45vw',
    '(max-width: 1320px) 25vw',
    '320px',
  ].join(', ');

  const hasListings = listings.length > 0;
  const statusMessage = error ? (
    <FormattedMessage id="LandingPage.featured.error" />
  ) : !inProgress && !hasListings ? (
    <FormattedMessage id="LandingPage.featured.noListings" />
  ) : null;

  return (
    <section id="featured" className={css.root}>
      <div className={css.header}>
        <div className={css.titleGroup}>
          <div className={css.eyebrow}>
            <FormattedMessage id="LandingPage.featured.eyebrow" />
          </div>
          <h2 className={css.sectionTitle}>
            <FormattedMessage id="LandingPage.featured.title" />
          </h2>
        </div>
        <NamedLink name="SearchPage" className={css.arrowLink}>
          <FormattedMessage id="LandingPage.featured.viewAll" />
          <ArrowIcon />
        </NamedLink>
      </div>

      <div className={css.tabs} role="tablist">
        {TABS.map(code => {
          const isActive = country === code;
          return (
            <button
              key={code}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="featured-listings"
              className={classNames(css.tab, { [css.tabActive]: isActive })}
              onClick={() => onSelectCountry(code)}
            >
              {code === ALL_COUNTRIES ? (
                <FormattedMessage id="LandingPage.featured.allCountries" />
              ) : (
                <FormattedMessage id={`Countries.${code}.name`} />
              )}
            </button>
          );
        })}
      </div>

      <div
        id="featured-listings"
        role="tabpanel"
        aria-busy={inProgress}
        className={classNames(css.gridWrapper, { [css.loading]: inProgress })}
      >
        {statusMessage ? (
          <p className={css.status}>{statusMessage}</p>
        ) : (
          <ul className={css.grid}>
            {listings.map((l, i) => (
              <li key={l.id.uuid} className={css.gridItem} data-reveal="" data-delay={(i % 4) * 70}>
                <ListingCard listing={l} renderSizes={renderSizes} lazyLoadImage={false} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SectionFeatured;
