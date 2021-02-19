import { ShipHull } from '@app/models/ship';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { createReducer, on } from '@ngrx/store';

export interface NavigationState {
  shipClass: ShipHull;
}

export const initialState: NavigationState = {
  shipClass: ShipHull.dd,
};

export const navigationReducer = createReducer(
  initialState,
  on(NavigationActions.SetShipClass, (state, { shipClass }) => ({
    ...state,
    shipClass,
  }))
);
