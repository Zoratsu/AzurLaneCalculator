import { ShipClass } from '@app/models/ship';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { createReducer, on } from '@ngrx/store';

export interface NavigationState {
  shipClass: ShipClass;
}

export const initialState: NavigationState = {
  shipClass: ShipClass.dd,
};

export const navigationReducer = createReducer(
  initialState,
  on(NavigationActions.SetShipClass, (state, { shipClass }) => ({
    ...state,
    shipClass,
  }))
);
