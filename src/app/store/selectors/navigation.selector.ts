import { EquipmentType } from '@app/models/equipment';
import { AppState } from '@app/store';
import { createSelector } from '@ngrx/store';

export const selectNavigation = (state: AppState) => state.navigation;

export const selectNavigationShipClass = createSelector(
  selectNavigation,
  (state) => state.hullType
);

export const selectNavigationEquipmentType = createSelector(
  selectNavigation,
  (state) => state.equipmentType
);
export const selectNavigationSelectedEquipmentType = createSelector(
  selectNavigation,
  (state) => {
    if (Array.isArray(state.equipmentType)) {
      //TODO fix this when logic is made
      return EquipmentType.default;
    } else {
      return state.equipmentType;
    }
  }
);
export const selectNavigationEquipmentTypeIsGun = createSelector(
  selectNavigationSelectedEquipmentType,
  (type) =>
    type === EquipmentType.dd ||
    type === EquipmentType.cl ||
    type === EquipmentType.ca ||
    type === EquipmentType.cb
);

export const selectNavigationSlot = createSelector(
  selectNavigation,
  (state) => state.slot
);
