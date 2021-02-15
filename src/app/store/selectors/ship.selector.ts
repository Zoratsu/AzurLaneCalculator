import { AppState } from '@app/store';
import { createSelector } from '@ngrx/store';

export const selectShip = (state: AppState) => state.ship;

export const selectShipActive = createSelector(
  selectShip,
  (state) => state.active
);
export const selectShipIsActive = createSelector(
  selectShip,
  (state) => !!state.active
);
export const selectShipCalculation = createSelector(
  selectShip,
  (state) => state.calculation
);
