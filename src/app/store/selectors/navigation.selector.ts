import { AppState } from '@app/store';
import { createSelector } from '@ngrx/store';

export const selectNavigation = (state: AppState) => state.navigation;

export const selectNavigationShipClass = createSelector(
  selectNavigation,
  (state) => state.shipClass
);
