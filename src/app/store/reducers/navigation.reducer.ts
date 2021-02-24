import { EquipmentType } from '@app/models/equipment';
import { ShipSlotNavigation } from '@app/models/navigation';
import { HullType } from '@app/models/ship';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { createReducer, on } from '@ngrx/store';

export interface NavigationState {
  hullType: HullType;
  equipmentType: EquipmentType | EquipmentType[];
  slot: ShipSlotNavigation;
}

export const initialState: NavigationState = {
  hullType: HullType.dd,
  equipmentType: EquipmentType.dd,
  slot: ShipSlotNavigation.ship,
};

export const navigationReducer = createReducer(
  initialState,
  on(NavigationActions.SetShipClass, (state, { hullType }) => ({
    ...state,
    hullType,
  })),
  on(NavigationActions.SetShipClass, (state) => ({
    ...state,
    hullType: initialState.hullType,
  })),

  on(NavigationActions.SetEquipmentType, (state, { equipmentType }) => ({
    ...state,
    equipmentType,
  })),
  on(NavigationActions.SetEquipmentType, (state) => ({
    ...state,
    equipmentType: initialState.equipmentType,
  })),

  on(NavigationActions.SetShipSlot, (state, { slot }) => ({
    ...state,
    slot,
  })),
  on(NavigationActions.SetShipSlot, (state) => ({
    ...state,
    slot: initialState.slot,
  }))
);
