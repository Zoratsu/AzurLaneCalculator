import { EquipmentType } from '@app/models/equipment';
import { ShipSlotNavigation } from '@app/models/navigation';
import { HullType, IShipSlot } from '@app/models/ship';
import { createAction, props } from '@ngrx/store';

export enum NavigationActionTypes {
  SET_SHIP_CLASS = '[Navigation] Set Ship Class',
  SET_EQUIPMENT_TYPE = '[Navigation] Set Equipment Type',
  SET_SHIP_SLOT = '[Navigation] Set Ship Slot',
}

export const SetShipClass = createAction(
  NavigationActionTypes.SET_SHIP_CLASS,
  props<{ hullType: HullType }>()
);
export const SetEquipmentType = createAction(
  NavigationActionTypes.SET_EQUIPMENT_TYPE,
  props<{ equipmentType: EquipmentType | EquipmentType[] }>()
);
export const SetShipSlot = createAction(
  NavigationActionTypes.SET_SHIP_SLOT,
  props<{ slot: ShipSlotNavigation }>()
);

export const NavigationActions = {
  SetShipClass,
  SetEquipmentType,
  SetShipSlot,
};
