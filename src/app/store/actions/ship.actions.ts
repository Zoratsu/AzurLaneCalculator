import { Nation } from '@app/models/nation';
import { IShip, IShipCalculation, IShipStat } from '@app/models/ship';
import { createAction, props } from '@ngrx/store';

export enum ShipActionTypes {
  SET_ACTIVE_SHIP = '[SHIP] Set Active Ship',
  SET_ACTIVE_SHIP_SUCCESS = '[SHIP] Set Active Ship Success',
  SET_ACTIVE_SHIP_FAILED = '[SHIP] Set Active Ship Failed',
  SET_ACTIVE_SHIP_STAT = '[SHIP] Set Active Ship Stat',
  SET_ACTIVE_SHIP_STAT_SUCCESS = '[SHIP] Set Active Ship Stat Success',
  SET_ACTIVE_SHIP_STAT_FAILED = '[SHIP] Set Active Ship Stat Failed',
  LOAD_ARRAY = '[SHIP] Load Array',
  LOAD_ARRAY_SUCCESS = '[SHIP] Load Array Success',
  LOAD_ARRAY_FAILED = '[SHIP] Load Array Failed',
  PROCESS_ACTIVE = '[SHIP] Process Active',
  PROCESS_ACTIVE_SUCCESS = '[SHIP] Process Active Success',
  PROCESS_ACTIVE_FAILED = '[SHIP] Process Active Failed',
}

export const SetActiveShip = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP,
  props<{ ship?: IShip }>()
);
export const SetActiveShipSuccess = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP_SUCCESS
);
export const SetActiveShipFailed = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP_FAILED
);

export const SetActiveShipStat = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP_STAT,
  props<{ shipStat?: IShipStat }>()
);
export const SetActiveShipStatSuccess = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP_STAT_SUCCESS
);
export const SetActiveShipStatFailed = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP_STAT_FAILED
);

export const LoadArray = createAction(
  ShipActionTypes.LOAD_ARRAY,
  props<{ nation?: Nation }>()
);
export const LoadArraySuccess = createAction(
  ShipActionTypes.LOAD_ARRAY_SUCCESS,
  props<{ ships: IShip[] }>()
);
export const LoadArrayFailed = createAction(ShipActionTypes.LOAD_ARRAY_FAILED);

export const ProcessActive = createAction(ShipActionTypes.PROCESS_ACTIVE);
export const ProcessActiveSuccess = createAction(
  ShipActionTypes.PROCESS_ACTIVE_SUCCESS,
  props<{ calculation: IShipCalculation }>()
);
export const ProcessActiveFailed = createAction(
  ShipActionTypes.PROCESS_ACTIVE_FAILED
);

export const ShipActions = {
  SetActiveShip,
  SetActiveShipSuccess,
  SetActiveShipFailed,
  SetActiveShipStat,
  SetActiveShipStatSuccess,
  SetActiveShipStatFailed,
  LoadArray,
  LoadArraySuccess,
  LoadArrayFailed,
  ProcessActive,
  ProcessActiveSuccess,
  ProcessActiveFailed,
};
