import { EquipmentType } from '@app/models/equipment';
import { ShipSlotNavigation } from '@app/models/navigation';
import { HullType } from '@app/models/ship';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { createReducer, on } from '@ngrx/store';

export interface NavigationState {
  hullType: HullType;
  equipmentType: EquipmentType | EquipmentType[];
  selectedEquipmentType: EquipmentType;
  slot: ShipSlotNavigation;
}

export const initialState: NavigationState = {
  hullType: HullType.dd,
  equipmentType: EquipmentType.dd,
  selectedEquipmentType: EquipmentType.dd,
  slot: ShipSlotNavigation.ship,
};

export const navigationReducer = createReducer(
  initialState,
  on(NavigationActions.SetShipClass, (state, { hullType }) => ({
    ...state,
    hullType,
  })),
  on(NavigationActions.ClearShipClass, (state) => ({
    ...state,
    hullType: initialState.hullType,
  })),

  on(NavigationActions.SetEquipmentType, (state, { equipmentType }) => ({
    ...state,
    equipmentType,
  })),
  on(NavigationActions.SelectEquipmentType, (state, { equipmentType }) => ({
    ...state,
    selectedEquipmentType: equipmentType,
  })),
  on(NavigationActions.ClearEquipmentType, (state) => ({
    ...state,
    equipmentType: initialState.equipmentType,
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
