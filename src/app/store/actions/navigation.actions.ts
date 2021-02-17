import { ShipClass } from '@app/models/ship';
import { createAction, props } from '@ngrx/store';

export enum NavigationActionTypes {
  SET_SHIP_CLASS = '[Navigation] Set Ship Class',
}

export const SetShipClass = createAction(
  NavigationActionTypes.SET_SHIP_CLASS,
  props<{ shipClass: ShipClass }>()
);

export const NavigationActions = {
  SetShipClass,
};
