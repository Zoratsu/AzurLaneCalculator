import { ShipState } from '@app/models/shipStore';
import { ShipActions } from '@app/store/actions/ship.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: ShipState = {
  active: {
    ship: undefined,
    shipStat: undefined,
    shipBuff: {
      damage: 0,
      antiAir: 0,
      reload: 0,
      firepower: 0,
      torpedo: 0,
      aviation: 0,
      initialStrike: 0,
      allStrike: 0,
    },
    shipSlotsEfficiencies: undefined,
    shipSlots: {},
  },
  calculation: undefined,
  array: [],
};
export const shipReducer = createReducer(
  initialState,
  on(ShipActions.LoadArraySuccess, (state, { ships }) => ({
    ...state,
    array: [...ships],
  })),

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

  on(ShipActions.SetActiveShipSlots, (state, { slots }) => ({
    ...state,
    active: {
      ...state.active,
      shipSlots: { ...state.active.shipSlots, ...slots },
    },
  })),
  on(ShipActions.ClearActiveShipSlots, (state) => ({
    ...state,
    active: { ...state.active, shipSlots: initialState.active.shipSlots },
  })),

  on(
    ShipActions.SetActiveShipSlotEfficiencies,
    (state, { shipSlotsEfficiencies }) => ({
      ...state,
      active: {
        ...state.active,
        shipSlotsEfficiencies: { ...shipSlotsEfficiencies },
      },
    })
  ),
  on(ShipActions.ClearActiveShipSlotEfficiencies, (state) => ({
    ...state,
    active: {
      ...state.active,
      shipSlotsEfficiencies: initialState.active.shipSlotsEfficiencies,
    },
  })),

  on(ShipActions.SetActiveShipBuff, (state, { shipBuff }) => ({
    ...state,
    active: {
      ...state.active,
      shipBuff: { ...shipBuff },
    },
  })),
  on(ShipActions.ClearActiveShipBuff, (state) => ({
    ...state,
    active: {
      ...state.active,
      shipBuff: initialState.active.shipBuff,
    },
  })),

  on(ShipActions.ProcessActiveSuccess, (state, { calculation }) => ({
    ...state,
    calculation: { ...calculation },
  }))
);
