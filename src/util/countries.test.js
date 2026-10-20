import {
  COUNTRIES,
  normalizeCountryCode,
  getListingCountryCode,
  countryQueryParams,
  countrySearch,
} from './countries';

describe('countries', () => {
  it('has the five Nordkart countries', () => {
    expect(COUNTRIES.map(c => c.code)).toEqual(['FI', 'SE', 'NO', 'DK', 'GE']);
  });

  describe('normalizeCountryCode', () => {
    it('normalizes supported codes', () => {
      expect(normalizeCountryCode('fi')).toEqual('FI');
      expect(normalizeCountryCode(' Ge ')).toEqual('GE');
    });
    it('returns null for unsupported values', () => {
      expect(normalizeCountryCode('us')).toBeNull();
      expect(normalizeCountryCode(null)).toBeNull();
      expect(normalizeCountryCode(5)).toBeNull();
    });
  });

  describe('getListingCountryCode', () => {
    it('reads the country from public data', () => {
      const listing = { attributes: { publicData: { country: 'dk' } } };
      expect(getListingCountryCode(listing)).toEqual('DK');
    });
    it('returns null when missing', () => {
      expect(getListingCountryCode({ attributes: { publicData: {} } })).toBeNull();
      expect(getListingCountryCode(undefined)).toBeNull();
    });
  });

  describe('countryQueryParams and countrySearch', () => {
    it('builds pub_country params', () => {
      expect(countryQueryParams('SE')).toEqual({ pub_country: 'se' });
      expect(countrySearch('no')).toEqual('?pub_country=no');
    });
    it('returns empty values for unknown countries', () => {
      expect(countryQueryParams('All')).toEqual({});
      expect(countrySearch('All')).toEqual('');
    });
  });
});
