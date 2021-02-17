import { IGun } from '@app/models/gun';
import { IShip, IShipCalculation } from '@app/models/ship';
import { GunActionTypes } from '@app/store/actions/gun.action';
import { createAction, props } from '@ngrx/store';

export enum ShipActionTypes {
  SET_ACTIVE = '[SHIP] Set Active',
  SET_ACTIVE_SUCCESS = '[SHIP] Set Active Success',
  SET_ACTIVE_FAILED = '[SHIP] Set Active Failed',
  LOAD_ARRAY = '[SHIP] Load Array',
  LOAD_ARRAY_SUCCESS = '[SHIP] Load Array Success',
  LOAD_ARRAY_FAILED = '[SHIP] Load Array Failed',
  PROCESS_ACTIVE = '[SHIP] Process Active',
  PROCESS_ACTIVE_SUCCESS = '[SHIP] Process Active Success',
  PROCESS_ACTIVE_FAILED = '[SHIP] Process Active Failed',
}

export const SetActive = createAction(
  ShipActionTypes.SET_ACTIVE,
  props<{ ship?: IShip }>()
);
export const SetActiveSuccess = createAction(
  ShipActionTypes.SET_ACTIVE_SUCCESS
);
export const SetActiveFailed = createAction(ShipActionTypes.SET_ACTIVE_FAILED);

export const LoadArray = createAction(
  ShipActionTypes.LOAD_ARRAY,
  props<{ name?: string }>()
);
export const LoadArraySuccess = createAction(
  ShipActionTypes.LOAD_ARRAY_SUCCESS,
  props<{ ships: IShip[] }>()
);
export const LoadArrayFailed = createAction(ShipActionTypes.LOAD_ARRAY_FAILED);

export const ProcessActive = createAction(
  ShipActionTypes.PROCESS_ACTIVE,
  props<{ active?: IShip }>()
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
  LoadArray,
  LoadArraySuccess,
  LoadArrayFailed,
  ProcessActive,
  ProcessActiveSuccess,
  ProcessActiveFailed,
};
