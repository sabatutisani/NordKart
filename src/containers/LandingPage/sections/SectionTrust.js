import React from 'react';

import { FormattedMessage } from '../../../util/reactIntl';

import css from './SectionTrust.module.css';

const NAVY = '#071D3A';
const RED = '#F5223A';

const ICONS = {
  secure: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" stroke={NAVY} />
      <path d="M8.5 12l2.5 2.5 4.5-5" stroke={RED} />
    </svg>
  ),
  shipping: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8l9-4 9 4v9l-9 4-9-4z" stroke={NAVY} />
      <path d="M3 8l9 4 9-4M12 12v9" stroke={NAVY} />
      <path d="M7.5 6l9 4" stroke={RED} />
    </svg>
  ),
  selection: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke={NAVY} />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke={RED} />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke={NAVY} />
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke={NAVY} />
    </svg>
  ),
  crossBorder: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="5.5" cy="17.5" r="2.5" stroke={NAVY} />
      <circle cx="18.5" cy="6.5" r="2.5" stroke={RED} />
      <path d="M7.5 15.5C9 10 12 7 16 6.5" stroke={NAVY} strokeDasharray="2 2.2" />
    </svg>
  ),
};

const ITEMS = ['secure', 'shipping', 'selection', 'crossBorder'];

/**
 * Trust strip: four short value propositions.
 *
 * @component
 * @returns {JSX.Element} trust section
 */
const SectionTrust = () => {
  return (
    <section className={css.root}>
      <ul className={css.list}>
        {ITEMS.map((key, i) => (
          <li key={key} className={css.itemWrapper} data-reveal="" data-delay={i * 60}>
            <div className={css.item}>
              <div className={css.icon} aria-hidden="true">
                {ICONS[key]}
              </div>
              <div className={css.text}>
                <h2 className={css.title}>
                  <FormattedMessage id={`LandingPage.trust.${key}.title`} />
                </h2>
                <p className={css.description}>
                  <FormattedMessage id={`LandingPage.trust.${key}.text`} />
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SectionTrust;
