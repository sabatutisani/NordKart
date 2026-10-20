import React from 'react';
import classNames from 'classnames';

import { FormattedMessage, useIntl } from '../../util/reactIntl';
import { COUNTRIES, countrySearch } from '../../util/countries';

import { Flag, LinkedLogo, NamedLink } from '../../components';

import { SocialMediaLink } from '../PageBuilder/Primitives/Link/SocialMediaLink';

import css from './NordkartFooter.module.css';

// Link groups of the footer. Links with 'pageId' point to content pages created in Console
// (Content > Pages), e.g. /p/about. Create those pages in Console, or remove the links here.
const LINK_GROUPS = [
  {
    key: 'marketplace',
    links: [
      { key: 'browse', name: 'SearchPage' },
      { key: 'categories', name: 'LandingPage', to: { hash: '#countries' } },
      { key: 'sell', name: 'NewListingPage' },
      { key: 'howItWorks', name: 'LandingPage', to: { hash: '#how' } },
    ],
  },
  {
    key: 'company',
    links: [
      { key: 'about', name: 'CMSPage', params: { pageId: 'about' } },
      { key: 'contact', name: 'CMSPage', params: { pageId: 'contact' } },
      { key: 'careers', name: 'CMSPage', params: { pageId: 'careers' } },
    ],
  },
  {
    key: 'support',
    links: [
      { key: 'help', name: 'CMSPage', params: { pageId: 'help' } },
      { key: 'shipping', name: 'CMSPage', params: { pageId: 'shipping' } },
      { key: 'returns', name: 'CMSPage', params: { pageId: 'returns' } },
      { key: 'payments', name: 'CMSPage', params: { pageId: 'payments' } },
    ],
  },
];

/**
 * Coded site-wide footer of the Nordkart design.
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @param {Array<Object>?} props.socialMediaLinks social media links from the hosted footer asset
 * @param {Object?} props.linkLogoToExternalSite logo link config from hosted topbar asset
 * @returns {JSX.Element} footer
 */
const NordkartFooter = props => {
  const { className, rootClassName, socialMediaLinks = [], linkLogoToExternalSite } = props;
  const intl = useIntl();
  const classes = classNames(rootClassName || css.root, className);
  const year = new Date().getFullYear();

  const socialLinks = socialMediaLinks
    .map(sml => sml?.link)
    .filter(link => link?.platform && link?.url);

  return (
    <footer className={classes}>
      <div className={css.content}>
        <div className={css.grid}>
          <div className={css.brandColumn}>
            <LinkedLogo
              rootClassName={css.logoLink}
              layout="desktop"
              linkToExternalSite={linkLogoToExternalSite}
            />
            <p className={css.slogan}>
              <FormattedMessage id="NordkartFooter.slogan" />
            </p>
            {socialLinks.length > 0 ? (
              <ul className={css.socialLinks}>
                {socialLinks.map(link => (
                  <li key={link.platform}>
                    <SocialMediaLink
                      rootClassName={css.socialLink}
                      platform={link.platform}
                      href={link.url}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {LINK_GROUPS.map(group => (
            <nav
              key={group.key}
              className={css.linkColumn}
              aria-label={intl.formatMessage({ id: `NordkartFooter.${group.key}` })}
            >
              <h2 className={css.columnTitle}>
                <FormattedMessage id={`NordkartFooter.${group.key}`} />
              </h2>
              <ul className={css.linkList}>
                {group.links.map(l => (
                  <li key={l.key}>
                    <NamedLink name={l.name} params={l.params} to={l.to} className={css.link}>
                      <FormattedMessage id={`NordkartFooter.link.${l.key}`} />
                    </NamedLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav
            className={css.linkColumn}
            aria-label={intl.formatMessage({ id: 'NordkartFooter.countries' })}
          >
            <h2 className={css.columnTitle}>
              <FormattedMessage id="NordkartFooter.countries" />
            </h2>
            <ul className={css.linkList}>
              {COUNTRIES.map(c => (
                <li key={c.code}>
                  <NamedLink
                    name="SearchPage"
                    to={{ search: countrySearch(c.code) }}
                    className={classNames(css.link, css.countryLink)}
                  >
                    <Flag code={c.code} size={16} />
                    <FormattedMessage id={`Countries.${c.code}.name`} />
                  </NamedLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={css.bottomRow}>
          <span>
            <FormattedMessage id="NordkartFooter.copyright" values={{ year }} />
          </span>
          <div className={css.bottomLinks}>
            <NamedLink name="PrivacyPolicyPage" className={css.bottomLink}>
              <FormattedMessage id="NordkartFooter.privacy" />
            </NamedLink>
            <NamedLink name="TermsOfServicePage" className={css.bottomLink}>
              <FormattedMessage id="NordkartFooter.terms" />
            </NamedLink>
            <span className={css.localeInfo}>
              <FormattedMessage id="NordkartFooter.localeInfo" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NordkartFooter;
