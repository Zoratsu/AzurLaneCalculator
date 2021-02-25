import { AppState } from '@app/store';
import { selectShipActiveSlotSelected } from '@app/store/selectors/ship.selector';
import { createSelector } from '@ngrx/store';

export const selectEquipment = (state: AppState) => state.equipment;

export const selectEquipmentArray = createSelector(
  selectEquipment,
  (state) => state.array
);
export const selectEquipmentActive = createSelector(
  selectEquipment,
  selectShipActiveSlotSelected,
  (state, slot) => {
    return {
      equipment: state.active.equipment || slot?.equipment,
      tier: state.active.tier || slot?.tier,
    };
  }
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
