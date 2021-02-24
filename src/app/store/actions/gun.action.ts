import { IGun, IGunCalculation, IGunTier } from '@app/models/gun';
import { Nation } from '@app/models/nation';
import { createAction, props } from '@ngrx/store';

export enum GunActionTypes {
  SET_ACTIVE_GUN = '[GUN] Set Active Gun',
  CLEAR_ACTIVE_GUN = '[GUN] Clear Active Gun',
  SET_ACTIVE_TIER = '[GUN] Set Active Tier',
  CLEAR_ACTIVE_TIER = '[GUN] Clear Active Tier',
  LOAD_ARRAY = '[GUN] Load Array',
  LOAD_ARRAY_SUCCESS = '[GUN] Load Array Success',
  LOAD_ARRAY_FAILED = '[GUN] Load Array Failed',
  PROCESS_ACTIVE = '[GUN] Process Active',
  PROCESS_ACTIVE_SUCCESS = '[GUN] Process Active Success',
  PROCESS_ACTIVE_FAILED = '[GUN] Process Active Failed',
}

export const SetActiveGun = createAction(
  GunActionTypes.SET_ACTIVE_GUN,
  props<{ gun: IGun }>()
);
export const ClearActiveGun = createAction(GunActionTypes.CLEAR_ACTIVE_GUN);

export const SetActiveTier = createAction(
  GunActionTypes.SET_ACTIVE_TIER,
  props<{ tier: IGunTier }>()
);
export const ClearActiveTier = createAction(GunActionTypes.CLEAR_ACTIVE_TIER);

export const LoadArray = createAction(
  GunActionTypes.LOAD_ARRAY,
  props<{ nation?: Nation }>()
);
export const LoadArraySuccess = createAction(
  GunActionTypes.LOAD_ARRAY_SUCCESS,
  props<{ guns: IGun[] }>()
);
export const LoadArrayFailed = createAction(GunActionTypes.LOAD_ARRAY_FAILED);

export const ProcessActive = createAction(GunActionTypes.PROCESS_ACTIVE);
export const ProcessActiveSuccess = createAction(
  GunActionTypes.PROCESS_ACTIVE_SUCCESS,
  props<{ calculation: IGunCalculation }>()
);
export const ProcessActiveFailed = createAction(
  GunActionTypes.PROCESS_ACTIVE_FAILED
);

export const GunActions = {
  SetActiveGun,
  ClearActiveGun,
  SetActiveTier,
  ClearActiveTier,
  LoadArray,
  LoadArraySuccess,
  LoadArrayFailed,
  ProcessActive,
  ProcessActiveSuccess,
  ProcessActiveFailed,
};
