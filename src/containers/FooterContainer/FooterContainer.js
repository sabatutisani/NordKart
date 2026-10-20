import React from 'react';
import { useConfiguration } from '../../context/configurationContext';

import NordkartFooter from './NordkartFooter';

/**
 * Site-wide footer.
 *
 * Nordkart: the footer is coded (see NordkartFooter.js) instead of being built from the hosted
 * footer asset. Only the social media links are still read from the footer asset in Console.
 *
 * @component
 * @returns {JSX.Element} footer
 */
const FooterComponent = () => {
  const { footer = {}, topbar } = useConfiguration();

  return (
    <NordkartFooter
      socialMediaLinks={footer?.socialMediaLinks}
      linkLogoToExternalSite={topbar?.logoLink}
    />
  );
};

// NOTE: if you want to add dynamic data to FooterComponent,
//       you could just connect this FooterContainer to Redux Store
//
// const mapStateToProps = state => {
//   const { currentUser } = state.user;
//   return { currentUser };
// };
// const FooterContainer = compose(connect(mapStateToProps))(FooterComponent);
// export default FooterContainer;

export default FooterComponent;
