import { IEquipment, IEquipmentTier } from '@app/models/equipment';
import {
  IShip,
  IShipBuff,
  IShipCalculation,
  IShipStat,
} from '@app/models/ship';
import { ShipActions } from '@app/store/actions/ship.actions';
import { createReducer, on } from '@ngrx/store';

export interface IShipEquippedSlots {
  primary?: { equipment?: IEquipment; tier?: IEquipmentTier };
  secondary?: { equipment?: IEquipment; tier?: IEquipmentTier };
  tertiary?: { equipment?: IEquipment; tier?: IEquipmentTier };
}

export interface IShipActive {
  ship?: IShip;
  shipStat?: IShipStat;
  buff?: IShipBuff;
  slots: IShipEquippedSlots;
}

export interface ShipState {
  active: IShipActive;
  calculation?: IShipCalculation;
  array: IShip[];
}

const initialState: ShipState = {
  active: { ship: undefined, shipStat: undefined, buff: undefined, slots: {} },
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
    active: { ...state.active, shipStat: undefined },
  })),

  on(ShipActions.LoadArraySuccess, (state, { ships }) => ({
    ...state,
    array: [...ships],
  })),

  on(ShipActions.ProcessActiveSuccess, (state, { calculation }) => ({
    ...state,
    calculation: { ...calculation },
  })),

  on(ShipActions.SetSlots, (state, { slots }) => ({
    ...state,
    active: { ...state.active, slots: { ...state.active.slots, ...slots } },
  })),

  on(ShipActions.ClearSlots, (state) => ({
    ...state,
    active: { ...state.active, slots: {} },
  }))
);
