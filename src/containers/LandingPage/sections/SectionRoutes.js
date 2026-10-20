import React from 'react';

import { FormattedMessage, useIntl } from '../../../util/reactIntl';

import { NamedLink } from '../../../components';

import css from './SectionRoutes.module.css';

// Route curves from the Nordic capitals to Tbilisi
const PATHS = [
  'M128 151 Q626 175 884 519',
  'M290 163 Q707 181 884 519',
  'M443 145 Q783 172 884 519',
  'M168 241 Q646 220 884 519',
];

const CITIES = [
  { code: 'NO', x: 128, y: 151, labelY: 112, countryY: 90 },
  { code: 'SE', x: 290, y: 163, labelY: 130, countryY: 102 },
  { code: 'FI', x: 443, y: 145, labelY: 112, countryY: 84 },
  { code: 'DK', x: 168, y: 241, labelY: 282, countryY: 306 },
];

const CITY_NAME_KEYS = {
  NO: 'LandingPage.routes.city.oslo',
  SE: 'LandingPage.routes.city.stockholm',
  FI: 'LandingPage.routes.city.helsinki',
  DK: 'LandingPage.routes.city.copenhagen',
  GE: 'LandingPage.routes.city.tbilisi',
};

const RouteMap = ({ intl }) => {
  const countryName = code => intl.formatMessage({ id: `Countries.${code}.name` }).toUpperCase();
  const cityName = code => intl.formatMessage({ id: CITY_NAME_KEYS[code] });
  return (
    <svg
      viewBox="0 0 1000 640"
      className={css.map}
      role="img"
      aria-label={intl.formatMessage({ id: 'LandingPage.routes.mapLabel' })}
    >
      <defs>
        <pattern id="nk-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill="#fff" fillOpacity=".1" />
        </pattern>
      </defs>
      <rect width="1000" height="640" fill="url(#nk-dots)" />
      <g fill="none" stroke="#fff" strokeOpacity=".14" strokeWidth="1.5">
        {PATHS.map(d => (
          <path key={d} d={d} />
        ))}
      </g>
      <g
        fill="none"
        stroke="#F5223A"
        strokeWidth="1.6"
        strokeDasharray="6 9"
        strokeLinecap="round"
        strokeOpacity=".85"
      >
        {PATHS.map((d, i) => (
          <path
            key={d}
            d={d}
            className={css.dash}
            style={{ animationDuration: `${[3, 3.4, 2.8, 3.2][i]}s` }}
          />
        ))}
      </g>
      <circle r="4" fill="#fff">
        <animateMotion dur="7s" repeatCount="indefinite" path={PATHS[0]} />
      </circle>
      <circle r="4" fill="#F5223A">
        <animateMotion
          dur="8s"
          begin="-3s"
          repeatCount="indefinite"
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode="linear"
          path={PATHS[1]}
        />
      </circle>
      <circle r="4" fill="#fff">
        <animateMotion dur="6.5s" begin="-2s" repeatCount="indefinite" path={PATHS[2]} />
      </circle>
      <circle r="4" fill="#F5223A">
        <animateMotion
          dur="7.5s"
          begin="-5s"
          repeatCount="indefinite"
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode="linear"
          path={PATHS[3]}
        />
      </circle>
      <circle r="4" fill="#fff">
        <animateMotion
          dur="9s"
          begin="-6s"
          repeatCount="indefinite"
          keyPoints="1;0"
          keyTimes="0;1"
          calcMode="linear"
          path={PATHS[2]}
        />
      </circle>
      <g>
        {CITIES.map(c => (
          <g key={c.code}>
            <circle cx={c.x} cy={c.y} r="7" fill="#071D3A" stroke="#fff" strokeWidth="2" />
            <text
              x={c.x}
              y={c.labelY}
              textAnchor="middle"
              fill="#fff"
              fontSize="26"
              fontWeight="700"
            >
              {cityName(c.code)}
            </text>
            <text
              x={c.x}
              y={c.countryY}
              textAnchor="middle"
              fill="#8E9CB2"
              fontSize="17"
              fontWeight="600"
              letterSpacing="2"
            >
              {countryName(c.code)}
            </text>
          </g>
        ))}
        <circle cx="884" cy="519" r="10" fill="none" stroke="#F5223A" strokeWidth="1.5">
          <animate attributeName="r" from="10" to="34" dur="2.4s" repeatCount="indefinite" />
          <animate
            attributeName="stroke-opacity"
            from=".8"
            to="0"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="884" cy="519" r="9" fill="#F5223A" stroke="#fff" strokeWidth="2.5" />
        <text x="884" y="574" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="700">
          {cityName('GE')}
        </text>
        <text
          x="884"
          y="598"
          textAnchor="middle"
          fill="#8E9CB2"
          fontSize="17"
          fontWeight="600"
          letterSpacing="2"
        >
          {countryName('GE')}
        </text>
      </g>
    </svg>
  );
};

/**
 * "Our routes": dark section with an animated route map.
 *
 * @component
 * @returns {JSX.Element} routes section
 */
const SectionRoutes = () => {
  const intl = useIntl();
  return (
    <section id="about" className={css.root}>
      <div className={css.content}>
        <div className={css.text} data-reveal="">
          <div className={css.eyebrow}>
            <FormattedMessage id="LandingPage.routes.eyebrow" />
          </div>
          <h2 className={css.title}>
            <FormattedMessage
              id="LandingPage.routes.title"
              values={{
                lineBreak: <br />,
                highlight: chunks => <span className={css.highlight}>{chunks}</span>,
              }}
            />
          </h2>
          <p className={css.description}>
            <FormattedMessage id="LandingPage.routes.description" />
          </p>
          <NamedLink name="CMSPage" params={{ pageId: 'shipping' }} className={css.link}>
            <FormattedMessage id="LandingPage.routes.link" />
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
        </div>
        <div className={css.mapWrapper} data-reveal="" data-delay="120">
          <RouteMap intl={intl} />
        </div>
      </div>
    </section>
  );
};

export default SectionRoutes;
