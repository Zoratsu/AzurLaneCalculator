import { AppState } from '@app/store';
import { selectGun } from '@app/store/selectors/gun.selector';
import { createSelector } from '@ngrx/store';

export const selectShip = (state: AppState) => state.ship;

export const selectShipArray = createSelector(
  selectShip,
  (state) => state.array
);

export const selectShipActive = createSelector(
  selectShip,
  (state) => state.active
);
export const selectShipIsActive = createSelector(
  selectShipActive,
  (ship) => !!ship.ship && !!ship.shipStat
);
export const selectShipCalculation = createSelector(
  selectShip,
  (state) => state.calculation
);
export const selectShipCalculationIsActive = createSelector(
  selectShipCalculation,
  (calculation) => !!calculation
);
