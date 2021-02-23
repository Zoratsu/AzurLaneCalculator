import { EquipmentType } from '@app/models/equipment';
import { ShipSlotNavigation } from '@app/models/navigation';
import { HullType } from '@app/models/ship';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { createReducer, on } from '@ngrx/store';

export interface NavigationState {
  hullType: HullType;
  equipmentType: EquipmentType;
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
    equipmentType: EquipmentType.dd,
  })),

  on(NavigationActions.SetEquipmentType, (state, { equipmentType }) => ({
    ...state,
    equipmentType,
    hullType: HullType.dd,
  })),

  on(NavigationActions.SetShipSlot, (state, { slot }) => ({
    ...state,
    slot,
  }))
);
