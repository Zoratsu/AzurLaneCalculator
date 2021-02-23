import { EquipmentType } from '@app/models/equipment';
import { HullType } from '@app/models/ship';
import { createAction, props } from '@ngrx/store';

export enum NavigationActionTypes {
  SET_SHIP_CLASS = '[Navigation] Set Ship Class',
  SET_EQUIPMENT_TYPE = '[Navigation] Set Equipment Type',
}

export const SetShipClass = createAction(
  NavigationActionTypes.SET_SHIP_CLASS,
  props<{ hullType: HullType }>()
);
export const SetEquipmentType = createAction(
  NavigationActionTypes.SET_EQUIPMENT_TYPE,
  props<{ equipmentType: EquipmentType }>()
);

export const NavigationActions = {
  SetShipClass,
  SetEquipmentType,
};
