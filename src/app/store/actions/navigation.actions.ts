import { EquipmentType } from '@app/models/equipment';
import { ShipSlotNavigation } from '@app/models/navigation';
import { HullType, IShipSlot } from '@app/models/ship';
import { createAction, props } from '@ngrx/store';

export enum NavigationActionTypes {
  SET_SHIP_CLASS = '[Navigation] Set Ship Class',
  CLEAR_SHIP_CLASS = '[Navigation] Clear Ship Class',
  SET_EQUIPMENT_TYPE = '[Navigation] Set Equipment Type',
  CLEAR_EQUIPMENT_TYPE = '[Navigation] Clear Equipment Type',
  SET_SHIP_SLOT = '[Navigation] Set Ship Slot',
  CLEAR_SHIP_SLOT = '[Navigation] Clear Ship Slot',
}

export const SetShipClass = createAction(
  NavigationActionTypes.SET_SHIP_CLASS,
  props<{ hullType: HullType }>()
);
export const ClearShipClass = createAction(
  NavigationActionTypes.CLEAR_SHIP_CLASS
);

export const SetEquipmentType = createAction(
  NavigationActionTypes.SET_EQUIPMENT_TYPE,
  props<{ equipmentType: EquipmentType | EquipmentType[] }>()
);
export const ClearEquipmentType = createAction(
  NavigationActionTypes.CLEAR_EQUIPMENT_TYPE
);

export const SetShipSlot = createAction(
  NavigationActionTypes.SET_SHIP_SLOT,
  props<{ slot: ShipSlotNavigation }>()
);
export const ClearShipSlot = createAction(
  NavigationActionTypes.CLEAR_SHIP_SLOT
);

export const NavigationActions = {
  SetShipClass,
  ClearShipClass,
  SetEquipmentType,
  ClearEquipmentType,
  SetShipSlot,
  ClearShipSlot,
};
