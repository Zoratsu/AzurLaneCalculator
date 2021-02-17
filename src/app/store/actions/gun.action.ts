import { IGun, IGunCalculation } from '@app/models/gun';
import { createAction, props } from '@ngrx/store';

export enum GunActionTypes {
  SET_ACTIVE = '[GUN] Set Active',
  SET_ACTIVE_SUCCESS = '[GUN] Set Active Success',
  SET_ACTIVE_FAILED = '[GUN] Set Active Failed',
  LOAD_ARRAY = '[GUN] Load Array',
  LOAD_ARRAY_SUCCESS = '[GUN] Load Array Success',
  LOAD_ARRAY_FAILED = '[GUN] Load Array Failed',
  PROCESS_ACTIVE = '[GUN] Process Active',
  PROCESS_ACTIVE_SUCCESS = '[GUN] Process Active Success',
  PROCESS_ACTIVE_FAILED = '[GUN] Process Active Failed',
}

export const SetActive = createAction(
  GunActionTypes.SET_ACTIVE,
  props<{ gun?: IGun }>()
);
export const SetActiveSuccess = createAction(GunActionTypes.SET_ACTIVE_SUCCESS);
export const SetActiveFailed = createAction(GunActionTypes.SET_ACTIVE_FAILED);

export const LoadArray = createAction(
  GunActionTypes.LOAD_ARRAY,
  props<{ name?: string }>()
);
export const LoadArraySuccess = createAction(
  GunActionTypes.LOAD_ARRAY_SUCCESS,
  props<{ guns: IGun[] }>()
);
export const LoadArrayFailed = createAction(GunActionTypes.LOAD_ARRAY_FAILED);

export const ProcessActive = createAction(
  GunActionTypes.PROCESS_ACTIVE,
  props<{ active?: IGun }>()
);
export const ProcessActiveSuccess = createAction(
  GunActionTypes.PROCESS_ACTIVE_SUCCESS,
  props<{ calculation: IGunCalculation }>()
);
export const ProcessActiveFailed = createAction(
  GunActionTypes.PROCESS_ACTIVE_FAILED
);

export const GunActions = {
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
