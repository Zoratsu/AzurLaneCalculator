import {
  IEquipment,
  IEquipmentCalculation,
  IEquipmentTier,
} from '@app/models/equipment';
import { createReducer, on } from '@ngrx/store';
import { EquipmentActions } from '../actions/equipment.action';

export interface IEquipmentActive {
  equipment?: IEquipment;
  tier?: IEquipmentTier;
}

export interface IEquipmentState {
  active: IEquipmentActive;
  calculation?: IEquipmentCalculation;
  array: IEquipment[];
}

const initialState: IEquipmentState = {
  active: { equipment: undefined, tier: undefined },
  calculation: undefined,
  array: [],
};
export const equipmentReducer = createReducer(
  initialState,
  on(EquipmentActions.SetActiveEquipment, (state, { equipment }) => ({
    ...state,
    active: { ...state.active, equipment },
  })),
  on(EquipmentActions.ClearActiveEquipment, (state) => ({
    ...state,
    active: { ...state.active, equipment: initialState.active.equipment },
  })),

  on(EquipmentActions.SetActiveTier, (state, { tier }) => ({
    ...state,
    active: { ...state.active, tier },
  })),
  on(EquipmentActions.ClearActiveTier, (state) => ({
    ...state,
    active: { ...state.active, tier: initialState.active.tier },
  })),

  on(EquipmentActions.LoadArray, (state) => ({
    ...state,
    array: [],
  })),
  on(EquipmentActions.LoadArraySuccess, (state, { equipments }) => ({
    ...state,
    array: [...equipments],
  })),

  on(EquipmentActions.ProcessActiveSuccess, (state, { calculation }) => ({
    ...state,
    calculation: { ...calculation },
  }))
);
