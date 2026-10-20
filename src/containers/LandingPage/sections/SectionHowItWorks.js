import React from 'react';
import classNames from 'classnames';

import { FormattedMessage } from '../../../util/reactIntl';

import css from './SectionHowItWorks.module.css';

const STEPS = ['find', 'order', 'shipping', 'receive'];

/**
 * "How it works": four steps connected by an animated route line.
 *
 * @component
 * @returns {JSX.Element} how it works section
 */
const SectionHowItWorks = () => {
  return (
    <section id="how" className={css.root}>
      <div className={css.content}>
        <div className={css.titleGroup}>
          <div className={css.eyebrow}>
            <FormattedMessage id="LandingPage.how.eyebrow" />
          </div>
          <h2 className={css.sectionTitle}>
            <FormattedMessage id="LandingPage.how.title" />
          </h2>
        </div>
        <div className={css.stepsWrapper}>
          <div className={css.lineBase} aria-hidden="true" />
          <div className={css.lineMarch} aria-hidden="true" />
          <div className={css.lineDot} aria-hidden="true" />
          <ol className={css.steps}>
            {STEPS.map((key, i) => (
              <li key={key} className={css.step} data-reveal="" data-delay={i * 90}>
                <div className={classNames(css.node, { [css.nodeLast]: i === STEPS.length - 1 })}>
                  {`0${i + 1}`}
                </div>
                <div className={css.stepText}>
                  <h3 className={css.stepTitle}>
                    <FormattedMessage id={`LandingPage.how.${key}.title`} />
                  </h3>
                  <p className={css.stepDescription}>
                    <FormattedMessage id={`LandingPage.how.${key}.text`} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default SectionHowItWorks;
