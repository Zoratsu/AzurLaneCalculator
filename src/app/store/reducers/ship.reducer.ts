import { IGun } from '@app/models/gun';
import { IShip, IShipCalculation } from '@app/models/ship';
import { ShipActions } from '@app/store/actions/ship.actions';
import { createReducer, on } from '@ngrx/store';

export interface ShipState {
  active: IShip | undefined;
  calculation: IShipCalculation | undefined;
  array: IGun[];
}

const initialState: ShipState = {
  active: undefined,
  calculation: undefined,
  array: [],
};
export const shipReducer = createReducer(
  initialState,
  on(ShipActions.SetActive, (state, { ship }) => ({
    ...state,
    active: {
      ...ship,
    },
  })),

  on(ShipActions.ProcessActiveSuccess, (state, { calculation }) => ({
    ...state,
    calculation: { ...calculation },
  }))
);
