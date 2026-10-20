import React, { useEffect } from 'react';
import classNames from 'classnames';

import { FormattedMessage, useIntl } from '../../util/reactIntl';

import NamedLink from '../NamedLink/NamedLink';

import css from './MobileBottomNav.module.css';

// Body class that reserves space for the bottom nav (see marketplaceDefaults.css)
const BODY_CLASS = 'hasMobileBottomNav';

const ACCOUNT_PAGES = [
  'ProfileSettingsPage',
  'AccountSettingsPage',
  'ContactDetailsPage',
  'PasswordChangePage',
  'StripePayoutPage',
  'PaymentMethodsPage',
  'ManageAccountPage',
  'ManageListingsPage',
  'LoginPage',
  'SignupPage',
];

const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 10.5L12 4l8 6.5V20H4z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

const IconBrowse = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const IconPlus = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const IconInbox = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path d="M4.5 6.5L12 12l7.5-5.5" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const IconAccount = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="M5 20c1-3.6 3.8-5.5 7-5.5s6 1.9 7 5.5" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const NavItem = ({ name, params, isActive, icon, labelId, badge }) => (
  <li className={css.item}>
    <NamedLink
      name={name}
      params={params}
      className={classNames(css.link, { [css.active]: isActive })}
    >
      <span className={css.iconWrapper}>
        {icon}
        {badge ? <span className={css.badge} /> : null}
      </span>
      <FormattedMessage id={labelId} />
    </NamedLink>
  </li>
);

/**
 * Floating bottom navigation for mobile layouts (hidden from 768px up).
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @param {boolean} props.isAuthenticated
 * @param {string?} props.currentPage resolved name of the current page (e.g. 'LandingPage')
 * @param {number?} props.notificationCount number of inbox notifications
 * @param {string?} props.inboxTab 'orders' or 'sales'
 * @param {boolean?} props.showCreateListingsLink show the "+" button to create a listing
 * @returns {JSX.Element} bottom navigation
 */
const MobileBottomNav = props => {
  const {
    className,
    rootClassName,
    isAuthenticated,
    currentPage = '',
    notificationCount = 0,
    inboxTab = 'orders',
    showCreateListingsLink = true,
  } = props;
  const intl = useIntl();

  useEffect(() => {
    document.body.classList.add(BODY_CLASS);
    return () => document.body.classList.remove(BODY_CLASS);
  }, []);

  const classes = classNames(rootClassName || css.root, className, {
    [css.withoutCreateLink]: !showCreateListingsLink,
  });
  const isSearchPage = ['SearchPage', 'SearchPageWithListingType'].includes(currentPage);
  const isInboxPage = currentPage.indexOf('InboxPage') === 0;

  return (
    <nav
      className={classes}
      aria-label={intl.formatMessage({ id: 'MobileBottomNav.screenreader.navigation' })}
    >
      <ul className={css.list}>
        <NavItem
          name="LandingPage"
          isActive={currentPage === 'LandingPage'}
          icon={<IconHome />}
          labelId="MobileBottomNav.home"
        />
        <NavItem
          name="SearchPage"
          isActive={isSearchPage}
          icon={<IconBrowse />}
          labelId="MobileBottomNav.browse"
        />
        {showCreateListingsLink ? (
          <li className={css.item}>
            <NamedLink
              name="NewListingPage"
              className={css.createLink}
              ariaLabel={intl.formatMessage({ id: 'MobileBottomNav.createListing' })}
            >
              <span className={css.createButton}>
                <IconPlus />
              </span>
            </NamedLink>
          </li>
        ) : null}
        <NavItem
          name="InboxPage"
          params={{ tab: inboxTab }}
          isActive={isInboxPage}
          icon={<IconInbox />}
          labelId="MobileBottomNav.inbox"
          badge={isAuthenticated && notificationCount > 0}
        />
        <NavItem
          name={isAuthenticated ? 'ProfileSettingsPage' : 'LoginPage'}
          isActive={ACCOUNT_PAGES.includes(currentPage)}
          icon={<IconAccount />}
          labelId="MobileBottomNav.account"
        />
      </ul>
    </nav>
  );
};

export default MobileBottomNav;
