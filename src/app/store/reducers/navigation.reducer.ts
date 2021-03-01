import { EquipmentType } from '@app/models/equipment';
import { ShipSlotNavigation } from '@app/models/navigation';
import { NavigationState } from '@app/models/navitagionStore';
import { HullType } from '@app/models/ship';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: NavigationState = {
  hullType: HullType.dd,
  equipmentType: EquipmentType.dd,
  selectedEquipmentType: undefined,
  slot: ShipSlotNavigation.ship,
};

export const navigationReducer = createReducer(
  initialState,
  on(NavigationActions.SetHullType, (state, { hullType }) => ({
    ...state,
    hullType,
  })),
  on(NavigationActions.ClearHullType, (state) => ({
    ...state,
    hullType: initialState.hullType,
  })),

  on(NavigationActions.SetEquipmentType, (state, { equipmentType }) => ({
    ...state,
    equipmentType,
  })),
  on(NavigationActions.ClearEquipmentType, (state) => ({
    ...state,
    equipmentType: initialState.equipmentType,
  })),

  on(
    NavigationActions.SetSelectedEquipmentType,
    (state, { equipmentType }) => ({
      ...state,
      selectedEquipmentType: equipmentType,
    })
  ),
  on(NavigationActions.ClearSelectedEquipmentType, (state) => ({
    ...state,
    selectedEquipment: initialState.selectedEquipmentType,
  })),

  on(NavigationActions.SetShipSlot, (state, { slot }) => ({
    ...state,
    slot,
  })),
  on(NavigationActions.ClearShipSlot, (state) => ({
    ...state,
    slot: initialState.slot,
  }))
);
