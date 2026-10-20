import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as log from '../../util/log';
import { isForbiddenError, storableError } from '../../util/errors';
import { createImageVariantConfig } from '../../util/sdkLoader';
import { countryQueryParams, normalizeCountryCode } from '../../util/countries';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';

// Number of listings shown in the "Featured this week" section
export const FEATURED_LISTINGS_COUNT = 8;
export const ALL_COUNTRIES = 'All';

// ================ Async Thunks ================ //

const fetchFeaturedListingsPayloadCreator = async (arg, thunkAPI) => {
  const { extra: sdk, rejectWithValue, dispatch } = thunkAPI;
  const { country, config } = arg;

  const { aspectWidth = 1, aspectHeight = 1, variantPrefix = 'listing-card' } =
    config?.layout?.listingImage || {};
  const aspectRatio = aspectHeight / aspectWidth;

  return sdk.listings
    .query({
      ...countryQueryParams(country),
      perPage: FEATURED_LISTINGS_COUNT,
      page: 1,
      minStock: 1,
      stockMode: 'match-undefined',
      include: ['images', 'author'],
      'fields.listing': [
        'title',
        'geolocation',
        'price',
        'deleted',
        'state',
        'publicData.listingType',
        'publicData.transactionProcessAlias',
        'publicData.unitType',
        'publicData.cardStyle',
        'publicData.country',
        'publicData.pickupEnabled',
        'publicData.shippingEnabled',
        'publicData.priceVariationsEnabled',
        'publicData.priceVariants',
      ],
      'fields.user': ['profile.displayName', 'profile.abbreviatedName'],
      'fields.image': [
        `variants.${variantPrefix}`,
        `variants.${variantPrefix}-2x`,
        'variants.scaled-small',
        'variants.scaled-medium',
      ],
      ...createImageVariantConfig(`${variantPrefix}`, 400, aspectRatio),
      ...createImageVariantConfig(`${variantPrefix}-2x`, 800, aspectRatio),
      'limit.images': 1,
    })
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      return { listingIds: response.data.data.map(l => l.id) };
    })
    .catch(error => {
      // Private marketplace / pending-approval users get 403 on listings.query;
      // that is expected access control, not an app bug.
      log.error(
        error,
        'landing-page-featured-listings-fetch-failed',
        { country },
        { skipSentry: isForbiddenError(error) }
      );
      return rejectWithValue(storableError(error));
    });
};

/**
 * Fetch featured listings for the landing page.
 * Call with { country, config }, where country is e.g. 'FI' or 'All'.
 */
export const fetchFeaturedListings = createAsyncThunk(
  'LandingPage/fetchFeaturedListings',
  fetchFeaturedListingsPayloadCreator
);

// ================ Slice ================ //

const initialState = {
  country: ALL_COUNTRIES,
  listingIds: [],
  fetched: false,
  inProgress: false,
  error: null,
  latestRequestId: null,
};

const landingPageSlice = createSlice({
  name: 'LandingPage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFeaturedListings.pending, (state, action) => {
        state.country = normalizeCountryCode(action.meta.arg.country) || ALL_COUNTRIES;
        state.inProgress = true;
        state.error = null;
        state.latestRequestId = action.meta.requestId;
      })
      .addCase(fetchFeaturedListings.fulfilled, (state, action) => {
        // Ignore responses of older requests (e.g. when country tabs are clicked quickly)
        if (action.meta.requestId !== state.latestRequestId) {
          return;
        }
        state.listingIds = action.payload.listingIds;
        state.fetched = true;
        state.inProgress = false;
      })
      .addCase(fetchFeaturedListings.rejected, (state, action) => {
        if (action.meta.requestId !== state.latestRequestId) {
          return;
        }
        state.listingIds = [];
        state.fetched = true;
        state.inProgress = false;
        state.error = action.payload || storableError(action.error);
      });
  },
});

export default landingPageSlice.reducer;

// ================ Load data ================ //

export const loadData = (params, search, config) => dispatch => {
  return dispatch(fetchFeaturedListings({ country: ALL_COUNTRIES, config }));
};
