import { ShipSlotNavigation } from '@app/models/navigation';
import { SlotID } from '@app/models/ship';
import { AppState } from '@app/store';
import {
  selectNavigationSelectedEquipmentType,
  selectNavigationSlot,
} from '@app/store/selectors/navigation.selector';
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

export const selectShipActiveSlots = createSelector(
  selectShipActive,
  (active) => active.slots
);

export const selectShipActiveSlotSelected = createSelector(
  selectShipActiveSlots,
  selectNavigationSlot,
  (slots, slot) => {
    switch (slot) {
      case ShipSlotNavigation.primary:
        return slots.primary;
      case ShipSlotNavigation.secondary:
        return slots.secondary;
      case ShipSlotNavigation.tertiary:
        return slots.tertiary;
    }
    return undefined;
  }
);

export const selectShipIsActive = createSelector(
  selectShipActive,
  (active) => !!active.ship && !!active.shipStat
);

export const selectShipCalculation = createSelector(
  selectShip,
  (state) => state.calculation
);

export const selectShipCalculationIsActive = createSelector(
  selectShipCalculation,
  (calculation) => !!calculation
);

export const selectShipActiveSlot = createSelector(
  selectNavigationSlot,
  (slot) => {
    switch (slot) {
      case ShipSlotNavigation.primary:
        return SlotID.primary;
      case ShipSlotNavigation.secondary:
        return SlotID.secondary;
      case ShipSlotNavigation.tertiary:
        return SlotID.tertiary;
      default:
        return SlotID.primary;
    }
  }
);
