import { AppState } from '@app/store';
import { createSelector } from '@ngrx/store';

export const selectGun = (state: AppState) => state.gun;

export const selectGunArray = createSelector(selectGun, (state) => state.array);
export const selectGunActive = createSelector(
  selectGun,
  (state) => state.active
);
export const selectGunIsActive = createSelector(
  selectGun,
  (state) => !!state.active
);
export const selectGunCalculation = createSelector(
  selectGun,
  (state) => state.calculation
);
