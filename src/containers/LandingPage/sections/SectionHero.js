import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';

import { FormattedMessage, useIntl } from '../../../util/reactIntl';
import { COUNTRIES } from '../../../util/countries';

import { Flag } from '../../../components';

import { LANDING_IMAGES } from '../landingImages';
import LandingImage from './LandingImage';

import css from './SectionHero.module.css';

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const HeroSearchForm = ({ onSubmit, intl }) => (
  <FinalForm
    onSubmit={values => onSubmit(values.keywords?.trim())}
    render={({ handleSubmit }) => (
      <form className={css.searchForm} onSubmit={handleSubmit} role="search">
        <span className={css.searchIcon}>
          <SearchIcon />
        </span>
        <label htmlFor="landing-hero-search" className={css.visuallyHidden}>
          <FormattedMessage id="LandingPage.hero.searchLabel" />
        </label>
        <Field
          id="landing-hero-search"
          name="keywords"
          component="input"
          type="search"
          className={css.searchInput}
          placeholder={intl.formatMessage({ id: 'LandingPage.hero.searchPlaceholder' })}
          autoComplete="off"
        />
        <button type="submit" className={css.searchButton}>
          <FormattedMessage id="LandingPage.hero.searchButton" />
        </button>
      </form>
    )}
  />
);

/**
 * Hero section: headline, keyword search, country chips and a visual with an animated route.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onKeywordSearch called with keywords string
 * @param {Function} props.onCountrySearch called with country code (e.g. 'FI')
 * @returns {JSX.Element} hero section
 */
const SectionHero = props => {
  const { onKeywordSearch, onCountrySearch } = props;
  const intl = useIntl();

  return (
    <section id="top" className={css.root}>
      <div className={css.content}>
        <div className={css.eyebrow}>
          <span className={css.eyebrowLine} />
          <FormattedMessage id="LandingPage.hero.eyebrow" />
        </div>
        <h1 className={css.title}>
          <FormattedMessage
            id="LandingPage.hero.title"
            values={{
              dot: <span className={css.dot}>.</span>,
              lineBreak: <br />,
            }}
          />
        </h1>
        <p className={css.subtitle}>
          <FormattedMessage id="LandingPage.hero.subtitle" />
        </p>

        <HeroSearchForm onSubmit={onKeywordSearch} intl={intl} />

        <ul className={css.chips}>
          {COUNTRIES.map(c => (
            <li key={c.code}>
              <button type="button" className={css.chip} onClick={() => onCountrySearch(c.code)}>
                <Flag code={c.code} size={18} />
                <FormattedMessage id={`Countries.${c.code}.name`} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={css.visual} aria-hidden="true">
        <div className={css.imageNordic}>
          <LandingImage
            src={LANDING_IMAGES.heroNordic}
            alt={intl.formatMessage({ id: 'LandingPage.hero.imageNordicAlt' })}
            tone="cool"
            eager
          />
          <div className={css.imageLabel}>
            <Flag code="NO" size={18} />
            <FormattedMessage id="LandingPage.hero.imageNordicLabel" />
          </div>
        </div>
        <div className={css.imageGeorgia}>
          <LandingImage
            src={LANDING_IMAGES.heroGeorgia}
            alt={intl.formatMessage({ id: 'LandingPage.hero.imageGeorgiaAlt' })}
            tone="warm"
            eager
          />
          <div className={css.imageLabel}>
            <Flag code="GE" size={18} />
            <FormattedMessage id="LandingPage.hero.imageGeorgiaLabel" />
          </div>
        </div>

        <svg className={css.route} viewBox="0 0 100 100">
          <path
            d="M54 9 Q 95 5 89 46"
            fill="none"
            stroke="#071D3A"
            strokeOpacity=".12"
            strokeWidth=".5"
          />
          <path
            className={css.routeDash}
            d="M54 9 Q 95 5 89 46"
            fill="none"
            stroke="#F5223A"
            strokeWidth=".45"
            strokeDasharray="1.4 1.4"
            strokeLinecap="round"
          />
          <circle r=".9" fill="#F5223A">
            <animateMotion dur="4.5s" repeatCount="indefinite" path="M54 9 Q 95 5 89 46" />
          </circle>
        </svg>
        <div className={css.routeFlagStart}>
          <Flag code="FI" size={40} ring={4} />
        </div>
        <div className={css.routeFlagEnd}>
          <Flag code="GE" size={40} ring={4} />
        </div>

        <div className={css.transitCard}>
          <div className={css.transitStatus}>
            <span className={css.transitDot} />
            <FormattedMessage id="LandingPage.hero.transitStatus" />
          </div>
          <div className={css.transitRoute}>
            <FormattedMessage id="LandingPage.hero.transitRoute" />
          </div>
          <div className={css.transitInfo}>
            <FormattedMessage id="LandingPage.hero.transitInfo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
