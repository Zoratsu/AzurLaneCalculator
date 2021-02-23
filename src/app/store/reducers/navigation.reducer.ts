import { EquipmentType } from '@app/models/equipment';
import { HullType } from '@app/models/ship';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { createReducer, on } from '@ngrx/store';

export interface NavigationState {
  hullType: HullType;
  equipmentType: EquipmentType;
}

export const initialState: NavigationState = {
  hullType: HullType.dd,
  equipmentType: EquipmentType.dd,
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
  }))
);
