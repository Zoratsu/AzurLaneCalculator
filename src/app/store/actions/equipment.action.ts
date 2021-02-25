import { IEquipment, IEquipmentTier } from '@app/models/equipment';
import { IEquipmentCalculation } from '@app/models/equipmentStore';
import { Nation } from '@app/models/nation';
import { createAction, props } from '@ngrx/store';

export enum EquipmentActionTypes {
  SET_ACTIVE_EQUIPMENT = '[EQUIPMENT] Set Active Equipment',
  CLEAR_ACTIVE_EQUIPMENT = '[EQUIPMENT] Clear Active Equipment',
  SET_ACTIVE_TIER = '[EQUIPMENT] Set Active Tier',
  CLEAR_ACTIVE_TIER = '[EQUIPMENT] Clear Active Tier',
  LOAD_ARRAY = '[EQUIPMENT] Load Array',
  LOAD_ARRAY_SUCCESS = '[EQUIPMENT] Load Array Success',
  LOAD_ARRAY_FAILED = '[EQUIPMENT] Load Array Failed',
  PROCESS_ACTIVE = '[EQUIPMENT] Process Active',
  PROCESS_ACTIVE_SUCCESS = '[EQUIPMENT] Process Active Success',
  PROCESS_ACTIVE_FAILED = '[EQUIPMENT] Process Active Failed',
}

export const SetActiveEquipment = createAction(
  EquipmentActionTypes.SET_ACTIVE_EQUIPMENT,
  props<{ equipment: IEquipment }>()
);
export const ClearActiveEquipment = createAction(
  EquipmentActionTypes.CLEAR_ACTIVE_EQUIPMENT
);

export const SetActiveTier = createAction(
  EquipmentActionTypes.SET_ACTIVE_TIER,
  props<{ tier: IEquipmentTier }>()
);
export const ClearActiveTier = createAction(
  EquipmentActionTypes.CLEAR_ACTIVE_TIER
);

export const LoadArray = createAction(
  EquipmentActionTypes.LOAD_ARRAY,
  props<{ nation?: Nation }>()
);
export const LoadArraySuccess = createAction(
  EquipmentActionTypes.LOAD_ARRAY_SUCCESS,
  props<{ equipments: IEquipment[] }>()
);
export const LoadArrayFailed = createAction(
  EquipmentActionTypes.LOAD_ARRAY_FAILED
);

export const ProcessActive = createAction(EquipmentActionTypes.PROCESS_ACTIVE);
export const ProcessActiveSuccess = createAction(
  EquipmentActionTypes.PROCESS_ACTIVE_SUCCESS,
  props<{ calculation: IEquipmentCalculation }>()
);
export const ProcessActiveFailed = createAction(
  EquipmentActionTypes.PROCESS_ACTIVE_FAILED
);

export const EquipmentActions = {
  SetActiveEquipment,
  ClearActiveEquipment,
  SetActiveTier,
  ClearActiveTier,
  LoadArray,
  LoadArraySuccess,
  LoadArrayFailed,
  ProcessActive,
  ProcessActiveSuccess,
  ProcessActiveFailed,
};
