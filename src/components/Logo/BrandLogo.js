import React from 'react';
import classNames from 'classnames';

import css from './BrandLogo.module.css';

/**
 * Nordkart brand mark: a cart with a flag on a navy rounded square.
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.mark
 * @param {number?} props.size size of the square in pixels (default 34)
 * @returns {JSX.Element} brand mark
 */
export const BrandMark = props => {
  const { className, size = 34 } = props;
  const iconSize = Math.round(size * 0.82);
  return (
    <span
      className={classNames(css.mark, className)}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.26) }}
      aria-hidden="true"
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 4v8" stroke="#fff" strokeWidth="1.6" />
        <path d="M16 5l6 3.5-6 3.5z" fill="#F5223A" stroke="#F5223A" strokeWidth="1" />
        <path d="M6 13h20l-2.6 6.2Q16 21.6 8.6 19.2z" fill="#fff" stroke="#fff" strokeWidth="1.6" />
        <path d="M6 13C4.6 10 2.8 9 2.8 6.6c0-1.8 2.4-2 2.6-.2" stroke="#fff" strokeWidth="1.8" />
        <path d="M26 13c1.4-3 3.2-4 3.2-6.4 0-1.8-2.4-2-2.6-.2" stroke="#fff" strokeWidth="1.8" />
        <circle cx="11" cy="15.6" r="1.3" fill="#F5223A" />
        <circle cx="16" cy="15.6" r="1.3" fill="#F5223A" />
        <circle cx="21" cy="15.6" r="1.3" fill="#F5223A" />
        <circle cx="11" cy="25.5" r="2.2" stroke="#fff" strokeWidth="1.6" />
        <circle cx="21" cy="25.5" r="2.2" stroke="#fff" strokeWidth="1.6" />
      </svg>
    </span>
  );
};

/**
 * Coded Nordkart logo: brand mark + wordmark.
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @param {string} props.marketplaceName accessible name for the logo
 * @param {boolean?} props.inverted use white wordmark (for dark backgrounds)
 * @returns {JSX.Element} logo
 */
const BrandLogo = props => {
  const { className, rootClassName, marketplaceName, inverted = false } = props;
  const classes = classNames(rootClassName || css.root, className, { [css.inverted]: inverted });
  return (
    <span className={classes} role="img" aria-label={marketplaceName}>
      <BrandMark />
      <span className={css.wordmark} aria-hidden="true">
        nordkart
      </span>
    </span>
  );
};

export default BrandLogo;
