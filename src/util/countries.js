/**
 * Nordkart marketplace countries.
 *
 * The listing field 'country' (an enum listing field configured in Console, with fallback in
 * src/config/configListing.js) uses the lowercase country codes as option values.
 * Public data is queried with the 'pub_' prefix, e.g. 'pub_country=fi'.
 */

export const COUNTRY_LISTING_FIELD_KEY = 'country';

/**
 * Countries in display order. Names and descriptions are translated with keys:
 * - Countries.{code}.name
 * - Countries.{code}.description
 */
export const COUNTRIES = [
  { code: 'FI', city: 'Helsinki' },
  { code: 'SE', city: 'Stockholm' },
  { code: 'NO', city: 'Oslo' },
  { code: 'DK', city: 'Copenhagen' },
  { code: 'GE', city: 'Tbilisi' },
];

const COUNTRY_CODES = COUNTRIES.map(c => c.code);

/**
 * Normalize a country code (e.g. 'fi', ' FI ') to an uppercase code, if it's supported.
 *
 * @param {string} code country code
 * @returns {string|null} uppercase code (e.g. 'FI') or null if the country is not supported
 */
export const normalizeCountryCode = code => {
  const normalized = typeof code === 'string' ? code.trim().toUpperCase() : null;
  return COUNTRY_CODES.includes(normalized) ? normalized : null;
};

/**
 * Get the country code of a listing from its public data.
 *
 * @param {Object} listing listing entity
 * @returns {string|null} uppercase country code or null
 */
export const getListingCountryCode = listing => {
  const value = listing?.attributes?.publicData?.[COUNTRY_LISTING_FIELD_KEY];
  return normalizeCountryCode(value);
};

/**
 * Query params for filtering listings by country.
 * Can be passed to sdk.listings.query or used as search params for SearchPage.
 *
 * @param {string} code country code
 * @returns {Object} e.g. { pub_country: 'fi' } or {} for unknown countries
 */
export const countryQueryParams = code => {
  const normalized = normalizeCountryCode(code);
  return normalized ? { [`pub_${COUNTRY_LISTING_FIELD_KEY}`]: normalized.toLowerCase() } : {};
};

/**
 * Search string for SearchPage, filtered by country.
 *
 * @param {string} code country code
 * @returns {string} e.g. '?pub_country=fi' or '' for unknown countries
 */
export const countrySearch = code => {
  const params = countryQueryParams(code);
  const pairs = Object.entries(params).map(
    ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
  );
  return pairs.length > 0 ? `?${pairs.join('&')}` : '';
};
