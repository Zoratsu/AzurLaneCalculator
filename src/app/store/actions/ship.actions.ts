import { IShip, IShipCalculation } from '@app/models/ship';
import { createAction, props } from '@ngrx/store';

export enum ShipActionTypes {
  SET_ACTIVE = '[SHIP] Set Active',
  SET_ACTIVE_SUCCESS = '[SHIP] Set Active Success',
  SET_ACTIVE_FAILED = '[SHIP] Set Active Failed',
  PROCESS_ACTIVE = '[SHIP] Process Active',
  PROCESS_ACTIVE_SUCCESS = '[SHIP] Process Active Success',
  PROCESS_ACTIVE_FAILED = '[SHIP] Process Active Failed',
}

export const SetActive = createAction(
  ShipActionTypes.SET_ACTIVE,
  props<{ ship: IShip }>()
);
export const SetActiveSuccess = createAction(
  ShipActionTypes.SET_ACTIVE_SUCCESS
);
export const SetActiveFailed = createAction(ShipActionTypes.SET_ACTIVE_FAILED);

export const ProcessActive = createAction(
  ShipActionTypes.PROCESS_ACTIVE,
  props<{ active: IShip }>()
);
export const ProcessActiveSuccess = createAction(
  ShipActionTypes.PROCESS_ACTIVE_SUCCESS,
  props<{ calculation: IShipCalculation }>()
);
export const ProcessActiveFailed = createAction(
  ShipActionTypes.PROCESS_ACTIVE_FAILED
);

export const ShipActions = {
  SetActive,
  SetActiveSuccess,
  SetActiveFailed,
  ProcessActive,
  ProcessActiveSuccess,
  ProcessActiveFailed,
};
