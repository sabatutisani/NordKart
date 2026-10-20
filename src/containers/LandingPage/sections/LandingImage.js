import React from 'react';
import classNames from 'classnames';

import css from './LandingImage.module.css';

/**
 * Image of the landing page. Renders a soft placeholder until an image source is given in
 * landingImages.js.
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.src image URL
 * @param {string} props.alt alternative text
 * @param {('cool'|'warm'|'mist')} props.tone placeholder background tone
 * @param {boolean?} props.eager load the image eagerly (above the fold)
 * @returns {JSX.Element} image or placeholder
 */
const LandingImage = props => {
  const { className, src, alt, tone = 'cool', eager = false } = props;
  const classes = classNames(css.root, css[tone], className);

  return (
    <div className={classes}>
      {src ? (
        <img
          className={css.image}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <div className={css.placeholder} role="img" aria-label={alt}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect
              x="3"
              y="4"
              width="18"
              height="16"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <circle cx="9" cy="10" r="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M4 18l5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default LandingImage;
