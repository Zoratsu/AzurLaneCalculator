import { IEquipmentState } from '@app/models/equipmentStore';
import { createReducer, on } from '@ngrx/store';
import { EquipmentActions } from '../actions/equipment.action';

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

  on(EquipmentActions.LoadArraySuccess, (state, { equipments }) => ({
    ...state,
    array: [...equipments],
  })),

  on(EquipmentActions.SetCalculation, (state, { calculation }) => ({
    ...state,
    calculation: { ...calculation },
  })),
  on(EquipmentActions.ClearCalculation, (state) => ({
    ...state,
    calculation: initialState.calculation,
  }))
);
