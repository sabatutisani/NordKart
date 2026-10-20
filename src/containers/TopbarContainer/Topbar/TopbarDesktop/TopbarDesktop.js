import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { FormattedMessage } from '../../../../util/reactIntl';
import { ACCOUNT_SETTINGS_PAGES } from '../../../../routing/routeConfiguration';
import { showCreateListingLinkForUser } from '../../../../util/userHelpers';
import {
  Avatar,
  InlineTextButton,
  LinkedLogo,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
} from '../../../../components';

import TopbarSearchForm from '../TopbarSearchForm/TopbarSearchForm';
import CustomLinksMenu from './CustomLinksMenu/CustomLinksMenu';

import css from './TopbarDesktop.module.css';

const SignupLink = () => {
  return (
    <NamedLink id="signup-link" name="SignupPage" className={css.signupButton}>
      <FormattedMessage id="TopbarDesktop.signup" />
    </NamedLink>
  );
};

// Main navigation links of the Nordkart design.
// Links with 'hash' point to sections of the landing page.
const NAV_LINKS = [
  { key: 'browse', name: 'SearchPage', activePages: ['SearchPage', 'SearchPageWithListingType'] },
  { key: 'categories', name: 'LandingPage', hash: '#countries' },
  { key: 'howItWorks', name: 'LandingPage', hash: '#how' },
  { key: 'sell', name: 'NewListingPage', requiresCreateListingLink: true },
  { key: 'about', name: 'LandingPage', hash: '#about' },
];

const MainNavLinks = ({ currentPage, showCreateListingsLink }) => {
  const links = NAV_LINKS.filter(l => !l.requiresCreateListingLink || showCreateListingsLink);
  return (
    <ul className={css.navLinks}>
      {links.map(l => {
        const isActive = !l.hash && (l.activePages || [l.name]).includes(currentPage);
        return (
          <li key={l.key} className={css.navLinkItem}>
            <NamedLink
              name={l.name}
              to={l.hash ? { hash: l.hash } : undefined}
              className={classNames(css.navLink, { [css.navLinkActive]: isActive })}
            >
              <FormattedMessage id={`TopbarDesktop.nav.${l.key}`} />
            </NamedLink>
          </li>
        );
      })}
    </ul>
  );
};

const SearchToggleIcon = ({ isOpen }) =>
  isOpen ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );

const LoginLink = () => {
  return (
    <NamedLink id="login-link" name="LoginPage" className={css.topbarLink}>
      <span className={css.topbarLinkLabel}>
        <FormattedMessage id="TopbarDesktop.login" />
      </span>
    </NamedLink>
  );
};

const InboxLink = ({ notificationCount, inboxTab }) => {
  const notificationDot = notificationCount > 0 ? <span className={css.notificationDot} /> : null;
  return (
    <NamedLink
      id="inbox-link"
      className={css.topbarLink}
      name="InboxPage"
      params={{ tab: inboxTab }}
    >
      <span className={css.topbarLinkLabel}>
        <FormattedMessage id="TopbarDesktop.inbox" />
        {notificationDot}
      </span>
    </NamedLink>
  );
};

const ProfileMenu = ({ currentPage, currentUser, onLogout, showManageListingsLink, intl }) => {
  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };

  return (
    <Menu skipFocusOnNavigation={true}>
      <MenuLabel
        id="profile-menu-label"
        className={css.profileMenuLabel}
        isOpenClassName={css.profileMenuIsOpen}
        ariaLabel={intl.formatMessage({ id: 'TopbarDesktop.screenreader.profileMenu' })}
      >
        <Avatar className={css.avatar} user={currentUser} disableProfileLink />
      </MenuLabel>
      <MenuContent className={css.profileMenuContent}>
        {showManageListingsLink ? (
          <MenuItem key="ManageListingsPage">
            <NamedLink
              className={classNames(css.menuLink, currentPageClass('ManageListingsPage'))}
              name="ManageListingsPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.yourListingsLink" />
            </NamedLink>
          </MenuItem>
        ) : null}
        <MenuItem key="ProfileSettingsPage">
          <NamedLink
            className={classNames(css.menuLink, currentPageClass('ProfileSettingsPage'))}
            name="ProfileSettingsPage"
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.profileSettingsLink" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="AccountSettingsPage">
          <NamedLink
            className={classNames(css.menuLink, currentPageClass('AccountSettingsPage'))}
            name="AccountSettingsPage"
          >
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
          </NamedLink>
        </MenuItem>
        <MenuItem key="logout">
          <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
            <span className={css.menuItemBorder} />
            <FormattedMessage id="TopbarDesktop.logout" />
          </InlineTextButton>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
};

/**
 * Topbar for desktop layout
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className add more style rules in addition to components own css.root
 * @param {string?} props.rootClassName overwrite components own css.root
 * @param {CurrentUser} props.currentUser API entity
 * @param {string?} props.currentPage
 * @param {boolean} props.isAuthenticated
 * @param {number} props.notificationCount
 * @param {Function} props.onLogout
 * @param {Function} props.onSearchSubmit
 * @param {Object?} props.initialSearchFormValues
 * @param {Object} props.intl
 * @param {Object} props.config
 * @param {boolean} props.showSearchForm
 * @param {boolean} props.showCreateListingsLink
 * @param {string} props.inboxTab
 * @returns {JSX.Element} search icon
 */
const TopbarDesktop = props => {
  const {
    className,
    config,
    customLinks,
    currentUser,
    currentPage,
    rootClassName,
    notificationCount = 0,
    intl,
    isAuthenticated,
    onLogout,
    onSearchSubmit,
    initialSearchFormValues = {},
    showSearchForm,
    showCreateListingsLink,
    inboxTab,
  } = props;
  const [mounted, setMounted] = useState(false);
  const isSearchPage = ['SearchPage', 'SearchPageWithListingType'].includes(currentPage);
  // On search pages, the search form is open by default so that the current query is visible.
  const [isSearchOpen, setSearchOpen] = useState(isSearchPage);

  useEffect(() => {
    setMounted(true);
  }, []);

  const marketplaceName = config.marketplaceName;
  const authenticatedOnClientSide = mounted && isAuthenticated;
  const isAuthenticatedOrJustHydrated = isAuthenticated || !mounted;

  // Create-listing visibility depends on currentUser. Until mount, use the anonymous rule on
  // both SSR and the first client render so PriorityLinks markup matches (avoids React #418/#425).
  const showCreateListingsLinkHydrationSafe = mounted
    ? showCreateListingsLink
    : showCreateListingLinkForUser(config, null);

  const hasCustomLinks = customLinks?.length > 0;
  const classes = classNames(rootClassName || css.root, className);

  const inboxLinkMaybe = authenticatedOnClientSide ? (
    <InboxLink notificationCount={notificationCount} inboxTab={inboxTab} />
  ) : null;

  const profileMenuMaybe = authenticatedOnClientSide ? (
    <ProfileMenu
      currentPage={currentPage}
      currentUser={currentUser}
      onLogout={onLogout}
      showManageListingsLink={showCreateListingsLink}
      intl={intl}
    />
  ) : null;

  const signupLinkMaybe = isAuthenticatedOrJustHydrated ? null : <SignupLink />;
  const loginLinkMaybe = isAuthenticatedOrJustHydrated ? null : <LoginLink />;

  const showSearch = showSearchForm && isSearchOpen;
  const searchFormMaybe = showSearch ? (
    <TopbarSearchForm
      className={css.searchForm}
      desktopInputRoot={css.searchInputRoot}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
      appConfig={config}
    />
  ) : null;

  const searchToggleMaybe = showSearchForm ? (
    <button
      type="button"
      className={css.iconButton}
      onClick={() => setSearchOpen(open => !open)}
      aria-expanded={isSearchOpen}
      aria-label={intl.formatMessage({
        id: isSearchOpen
          ? 'TopbarDesktop.screenreader.closeSearch'
          : 'TopbarDesktop.screenreader.search',
      })}
    >
      <SearchToggleIcon isOpen={isSearchOpen} />
    </button>
  ) : null;

  // Hosted custom links (Console > Top bar) are shown after the main navigation, when there's space.
  const customLinksMaybe =
    hasCustomLinks && !showSearch ? (
      <CustomLinksMenu
        currentPage={currentPage}
        customLinks={customLinks}
        intl={intl}
        hasClientSideContentReady={authenticatedOnClientSide || !isAuthenticatedOrJustHydrated}
        showCreateListingsLink={false}
      />
    ) : (
      <div className={css.spacer} />
    );

  return (
    <nav
      className={classes}
      aria-label={intl.formatMessage({ id: 'TopbarDesktop.screenreader.topbarNavigation' })}
    >
      <LinkedLogo
        id="logo-topbar-desktop"
        rootClassName={css.logoLink}
        layout="desktop"
        alt={intl.formatMessage({ id: 'TopbarDesktop.logo' }, { marketplaceName })}
        linkToExternalSite={config?.topbar?.logoLink}
      />

      {showSearch ? (
        searchFormMaybe
      ) : (
        <MainNavLinks
          currentPage={currentPage}
          showCreateListingsLink={showCreateListingsLinkHydrationSafe}
        />
      )}

      {customLinksMaybe}

      {searchToggleMaybe}
      {inboxLinkMaybe}
      {profileMenuMaybe}
      {loginLinkMaybe}
      {signupLinkMaybe}
    </nav>
  );
};

export default TopbarDesktop;
