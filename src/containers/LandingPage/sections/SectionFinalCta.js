import React from 'react';

import { FormattedMessage } from '../../../util/reactIntl';

import { NamedLink } from '../../../components';

import css from './SectionFinalCta.module.css';

/**
 * Final call to action at the bottom of the landing page.
 *
 * @component
 * @returns {JSX.Element} final CTA section
 */
const SectionFinalCta = () => {
  return (
    <section className={css.root}>
      <div className={css.panel}>
        <div className={css.circleLarge} aria-hidden="true" />
        <div className={css.circleSmall} aria-hidden="true" />
        <div className={css.circleDashed} aria-hidden="true" />
        <div className={css.dot} aria-hidden="true" />
        <div className={css.content} data-reveal="">
          <h2 className={css.title}>
            <FormattedMessage id="LandingPage.finalCta.title" />
          </h2>
          <div className={css.actions}>
            <NamedLink name="SearchPage" className={css.primaryButton}>
              <FormattedMessage id="LandingPage.finalCta.shop" />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NamedLink>
            <NamedLink name="NewListingPage" className={css.secondaryButton}>
              <FormattedMessage id="LandingPage.finalCta.sell" />
            </NamedLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFinalCta;
