import { AppState } from '@app/store';
import { createSelector } from '@ngrx/store';

export const selectEquipment = (state: AppState) => state.equipment;

export const selectEquipmentArray = createSelector(
  selectEquipment,
  (state) => state.array
);
export const selectEquipmentActive = createSelector(
  selectEquipment,
  (state) => state.active
);
export const selectEquipmentIsActive = createSelector(
  selectEquipmentActive,
  (active) => !!active.equipment && !!active.tier
);
export const selectEquipmentCalculation = createSelector(
  selectEquipment,
  (state) => state.calculation
);
export const selectEquipmentCalculationIsActive = createSelector(
  selectEquipmentCalculation,
  (calculation) => !!calculation
);
