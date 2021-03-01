import { EquipmentType } from '@app/models/equipment';
import { ShipSlotNavigation } from '@app/models/navigation';
import { HullType } from '@app/models/ship';
import { createAction, props } from '@ngrx/store';

export enum NavigationActionTypes {
  SET_HULL_TYPE = '[NAVITAGION] Set Hull Type',
  CLEAR_HULL_TYPE = '[NAVITAGION] Clear Hull Type',
  SET_SHIP_SLOT = '[NAVITAGION] Set Ship Slot',
  CLEAR_SHIP_SLOT = '[NAVITAGION] Clear Ship Slot',
  SET_EQUIPMENT_TYPE = '[NAVITAGION] Set Equipment Type',
  CLEAR_EQUIPMENT_TYPE = '[NAVITAGION] Clear Equipment Type',
  SET_SELECTED_EQUIPMENT_TYPE = '[NAVITAGION] Set Selected Equipment Type',
  CLEAR_SELECTED_EQUIPMENT_TYPE = '[NAVITAGION] Clear Selected Equipment Type',
}

export const SetHullType = createAction(
  NavigationActionTypes.SET_HULL_TYPE,
  props<{ hullType: HullType }>()
);
export const ClearHullType = createAction(
  NavigationActionTypes.CLEAR_HULL_TYPE
);

export const SetShipSlot = createAction(
  NavigationActionTypes.SET_SHIP_SLOT,
  props<{ slot: ShipSlotNavigation }>()
);
export const ClearShipSlot = createAction(
  NavigationActionTypes.CLEAR_SHIP_SLOT
);

export const SetEquipmentType = createAction(
  NavigationActionTypes.SET_EQUIPMENT_TYPE,
  props<{ equipmentType: EquipmentType | EquipmentType[] }>()
);
export const ClearEquipmentType = createAction(
  NavigationActionTypes.CLEAR_EQUIPMENT_TYPE
);

export const SetSelectedEquipmentType = createAction(
  NavigationActionTypes.SET_SELECTED_EQUIPMENT_TYPE,
  props<{ equipmentType: EquipmentType }>()
);
export const ClearSelectedEquipmentType = createAction(
  NavigationActionTypes.CLEAR_SELECTED_EQUIPMENT_TYPE
);

export const NavigationActions = {
  SetHullType,
  ClearHullType,
  SetEquipmentType,
  ClearEquipmentType,
  SetSelectedEquipmentType,
  ClearSelectedEquipmentType,
  SetShipSlot,
  ClearShipSlot,
};
