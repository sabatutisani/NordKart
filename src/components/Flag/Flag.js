import React from 'react';
import classNames from 'classnames';

import css from './Flag.module.css';

// Flag colors: bg = background, o = outer cross, i = inner cross (Norway), ge = Georgian 5-cross flag
const FLAGS = {
  FI: { bg: '#fff', o: '#002F6C' },
  SE: { bg: '#006AA7', o: '#FECC02' },
  NO: { bg: '#BA0C2F', o: '#fff', i: '#00205B' },
  DK: { bg: '#C8102E', o: '#fff' },
  GE: { bg: '#fff', o: '#E8112D', ge: true },
};

const abs = style => ({ position: 'absolute', ...style });

/**
 * Circular country flag drawn with CSS. Supports the Nordkart countries: FI, SE, NO, DK and GE.
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @param {('FI'|'SE'|'NO'|'DK'|'GE'|'fi'|'se'|'no'|'dk'|'ge')} props.code country code
 * @param {number?} props.size diameter in pixels (default 20)
 * @param {number?} props.ring width of the white ring around the flag in pixels (default 0)
 * @param {string?} props.title accessible name. If omitted, the flag is hidden from screen readers.
 * @returns {JSX.Element} flag
 */
const Flag = props => {
  const { className, rootClassName, code, size = 20, ring = 0, title } = props;
  const f = FLAGS[`${code || ''}`.toUpperCase()];
  if (!f) {
    return null;
  }

  const classes = classNames(rootClassName || css.root, className);
  const wrapStyle = {
    width: size,
    height: size,
    background: f.bg,
    boxShadow: ring ? `0 0 0 ${ring}px #fff` : 'none',
  };

  const bars = f.ge
    ? [
        abs({ left: 0, right: 0, top: '42%', height: '16%', background: f.o }),
        abs({ top: 0, bottom: 0, left: '42%', width: '16%', background: f.o }),
        ...[[15, 15], [73, 15], [15, 73], [73, 73]].map(([l, t]) =>
          abs({ left: `${l}%`, top: `${t}%`, width: '12%', height: '12%', background: f.o })
        ),
      ]
    : [
        abs({ left: 0, right: 0, top: '40%', height: '20%', background: f.o }),
        abs({ top: 0, bottom: 0, left: '28%', width: '20%', background: f.o }),
        ...(f.i
          ? [
              abs({ left: 0, right: 0, top: '45%', height: '10%', background: f.i }),
              abs({ top: 0, bottom: 0, left: '33%', width: '10%', background: f.i }),
            ]
          : []),
      ];

  const a11yProps = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };

  return (
    <span className={classes} style={wrapStyle} {...a11yProps}>
      {bars.map((style, i) => (
        <span key={i} style={style} />
      ))}
      <span className={css.ring} />
    </span>
  );
};

export default Flag;
