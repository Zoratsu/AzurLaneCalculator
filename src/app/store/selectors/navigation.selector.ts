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
      return state.selectedEquipmentType;
    } else {
      return state.equipmentType;
    }
  }
);

export const selectNavigationEquipmentTypeIsMixed = createSelector(
  selectNavigationEquipmentType,
  (type) => Array.isArray(type)
);

export const selectNavigationEquipmentTypeIsGun = createSelector(
  selectNavigationEquipmentType,
  selectNavigationSelectedEquipmentType,
  selectNavigationEquipmentTypeIsMixed,
  (type, selected, isMixed) => {
    let value = type;
    if (isMixed && selected) {
      value = selected;
    }
    return (
      value === EquipmentType.dd ||
      value === EquipmentType.cl ||
      value === EquipmentType.ca ||
      value === EquipmentType.cb ||
      value === EquipmentType.bb
    );
  }
);

export const selectNavigationEquipmentTypeIsTorpedo = createSelector(
  selectNavigationEquipmentType,
  selectNavigationSelectedEquipmentType,
  selectNavigationEquipmentTypeIsMixed,
  (type, selected, isMixed) => {
    let value = type;
    if (isMixed && selected) {
      value = selected;
    }
    return value === EquipmentType.torpSurf || value === EquipmentType.torpSubs;
  }
);

export const selectNavigationSlot = createSelector(
  selectNavigation,
  (state) => state.slot
);
