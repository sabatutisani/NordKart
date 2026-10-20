import React from 'react';

import { FormattedMessage, useIntl } from '../../../util/reactIntl';
import { COUNTRIES } from '../../../util/countries';

import { Flag, NamedLink } from '../../../components';

import { LANDING_IMAGES } from '../landingImages';
import LandingImage from './LandingImage';

import css from './SectionSell.module.css';

/**
 * "Sell on Nordkart": call to action for sellers.
 *
 * @component
 * @returns {JSX.Element} sell section
 */
const SectionSell = () => {
  const intl = useIntl();
  return (
    <section id="sell" className={css.root}>
      <div className={css.visual} data-reveal="">
        <div className={css.imageWrapper}>
          <LandingImage
            src={LANDING_IMAGES.sellLifestyle}
            alt={intl.formatMessage({ id: 'LandingPage.sell.imageAlt' })}
            tone="warm"
          />
        </div>
        <div className={css.visibleCard}>
          <div className={css.visibleTitle}>
            <FormattedMessage id="LandingPage.sell.visibleIn" />
          </div>
          <div className={css.flags}>
            {COUNTRIES.map(c => (
              <Flag
                key={c.code}
                code={c.code}
                size={28}
                title={intl.formatMessage({ id: `Countries.${c.code}.name` })}
              />
            ))}
          </div>
          <div className={css.exampleListing}>
            <FormattedMessage id="LandingPage.sell.exampleListing" />
          </div>
        </div>
      </div>
      <div className={css.text} data-reveal="" data-delay="100">
        <div className={css.eyebrow}>
          <FormattedMessage id="LandingPage.sell.eyebrow" />
        </div>
        <h2 className={css.title}>
          <FormattedMessage id="LandingPage.sell.title" />
        </h2>
        <p className={css.description}>
          <FormattedMessage id="LandingPage.sell.description" />
        </p>
        <div className={css.actions}>
          <NamedLink name="NewListingPage" className={css.ctaButton}>
            <FormattedMessage id="LandingPage.sell.cta" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NamedLink>
          <NamedLink name="LandingPage" to={{ hash: '#how' }} className={css.secondaryLink}>
            <FormattedMessage id="LandingPage.sell.learnMore" />
          </NamedLink>
        </div>
      </div>
    </section>
  );
};

export default SectionSell;
