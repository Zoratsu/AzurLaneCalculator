import {
  IShip,
  IShipBuff,
  IShipCalculation,
  IShipStat,
} from '@app/models/ship';
import { ShipActions } from '@app/store/actions/ship.actions';
import { createReducer, on } from '@ngrx/store';

export interface ShipState {
  active: {
    ship?: IShip;
    shipStat?: IShipStat;
    buff?: IShipBuff;
  };
  calculation?: IShipCalculation;
  array: IShip[];
}

const initialState: ShipState = {
  active: { ship: undefined, shipStat: undefined, buff: undefined },
  calculation: undefined,
  array: [],
};
export const shipReducer = createReducer(
  initialState,
  on(ShipActions.SetActiveShip, (state, { ship }) => ({
    ...state,
    active: { ...state.active, ship },
  })),

  on(ShipActions.SetActiveShipStat, (state, { shipStat }) => ({
    ...state,
    active: { ...state.active, shipStat },
  })),

  on(ShipActions.LoadArraySuccess, (state, { ships }) => ({
    ...state,
    array: [...ships],
  })),

  on(ShipActions.ProcessActiveSuccess, (state, { calculation }) => ({
    ...state,
    calculation: { ...calculation },
  }))
);
