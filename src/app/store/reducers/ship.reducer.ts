import { ShipState } from '@app/models/shipStore';
import { ShipActions } from '@app/store/actions/ship.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: ShipState = {
  active: {
    ship: undefined,
    shipStat: undefined,
    shipBuff: undefined,
    shipSlots: {},
  },
  calculation: undefined,
  array: [],
};
export const shipReducer = createReducer(
  initialState,
  on(ShipActions.SetActiveShip, (state, { ship }) => ({
    ...state,
    active: { ...state.active, ship },
  })),
  on(ShipActions.ClearActiveShip, (state) => ({
    ...state,
    active: { ...state.active, ship: initialState.active.ship },
  })),

  on(ShipActions.SetActiveShipStat, (state, { shipStat }) => ({
    ...state,
    active: { ...state.active, shipStat },
  })),
  on(ShipActions.ClearActiveShipStat, (state) => ({
    ...state,
    active: { ...state.active, shipStat: initialState.active.shipStat },
  })),

  on(ShipActions.LoadArraySuccess, (state, { ships }) => ({
    ...state,
    array: [...ships],
  })),

  on(ShipActions.ProcessActiveSuccess, (state, { calculation }) => ({
    ...state,
    calculation: { ...calculation },
  })),

  on(ShipActions.SetActiveSlots, (state, { slots }) => ({
    ...state,
    active: { ...state.active, slots: { ...state.active.shipSlots, ...slots } },
  })),

  on(ShipActions.ClearActiveSlots, (state) => ({
    ...state,
    active: { ...state.active, slots: {} },
  }))
);
