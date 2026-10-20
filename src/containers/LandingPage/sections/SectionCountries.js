import React from 'react';

import { FormattedMessage, useIntl } from '../../../util/reactIntl';
import { COUNTRIES, countrySearch } from '../../../util/countries';

import { Flag, NamedLink } from '../../../components';

import { LANDING_IMAGES } from '../landingImages';
import LandingImage from './LandingImage';

import css from './SectionCountries.module.css';

/**
 * "Browse by country": a card per country that links to search filtered by country.
 *
 * @component
 * @returns {JSX.Element} countries section
 */
const SectionCountries = () => {
  const intl = useIntl();
  return (
    <section id="countries" className={css.root}>
      <div className={css.titleGroup}>
        <div className={css.eyebrow}>
          <FormattedMessage id="LandingPage.countries.eyebrow" />
        </div>
        <h2 className={css.sectionTitle}>
          <FormattedMessage id="LandingPage.countries.title" />
        </h2>
      </div>
      <ul className={css.cards}>
        {COUNTRIES.map((c, i) => {
          const name = intl.formatMessage({ id: `Countries.${c.code}.name` });
          return (
            <li key={c.code} className={css.cardItem} data-reveal="" data-delay={i * 70}>
              <NamedLink
                name="SearchPage"
                to={{ search: countrySearch(c.code) }}
                className={css.card}
              >
                <div className={css.image}>
                  <LandingImage src={LANDING_IMAGES[`country${c.code}`]} alt={name} tone="mist" />
                </div>
                <div className={css.gradient} />
                <div className={css.dim} />
                <div className={css.info}>
                  <Flag code={c.code} size={28} ring={2} />
                  <div className={css.nameRow}>
                    <span className={css.name}>{name}</span>
                    <span className={css.arrow} aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <span className={css.description}>
                    <FormattedMessage id={`Countries.${c.code}.description`} />
                  </span>
                </div>
              </NamedLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SectionCountries;
