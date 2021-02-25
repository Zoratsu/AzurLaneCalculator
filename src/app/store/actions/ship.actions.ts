import { Nation } from '@app/models/nation';
import { IShip, IShipCalculation, IShipStat } from '@app/models/ship';
import { IShipEquippedSlots } from '@app/store/reducers/ship.reducer';
import { createAction, props } from '@ngrx/store';

export enum ShipActionTypes {
  SET_ACTIVE_SHIP = '[SHIP] Set Active Ship',
  CLEAR_ACTIVE_SHIP = '[SHIP] Clear Active Ship',
  SET_ACTIVE_SHIP_STAT = '[SHIP] Set Active Ship Stat',
  CLEAR_ACTIVE_SHIP_STAT = '[SHIP] Clear Active Ship Stat',
  LOAD_ARRAY = '[SHIP] Load Array',
  LOAD_ARRAY_SUCCESS = '[SHIP] Load Array Success',
  LOAD_ARRAY_FAILED = '[SHIP] Load Array Failed',
  PROCESS_ACTIVE = '[SHIP] Process Active',
  PROCESS_ACTIVE_SUCCESS = '[SHIP] Process Active Success',
  PROCESS_ACTIVE_FAILED = '[SHIP] Process Active Failed',
  EQUIP_EQUIPMENT = '[SHIP] Equip Equipment In Active Slot',
  SET_ACTIVE_SLOTS = '[SHIP] Set Active Slots',
  CLEAR_ACTIVE_SLOTS = '[SHIP] Clear Active Slots',
}

export const SetActiveShip = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP,
  props<{ ship: IShip }>()
);
export const ClearActiveShip = createAction(ShipActionTypes.CLEAR_ACTIVE_SHIP);

export const SetActiveShipStat = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP_STAT,
  props<{ shipStat: IShipStat }>()
);
export const ClearActiveShipStat = createAction(
  ShipActionTypes.CLEAR_ACTIVE_SHIP_STAT
);

export const LoadArray = createAction(
  ShipActionTypes.LOAD_ARRAY,
  props<{ nation?: Nation }>()
);
export const LoadArraySuccess = createAction(
  ShipActionTypes.LOAD_ARRAY_SUCCESS,
  props<{ ships: IShip[] }>()
);
export const LoadArrayFailed = createAction(ShipActionTypes.LOAD_ARRAY_FAILED);

export const ProcessActive = createAction(ShipActionTypes.PROCESS_ACTIVE);
export const ProcessActiveSuccess = createAction(
  ShipActionTypes.PROCESS_ACTIVE_SUCCESS,
  props<{ calculation: IShipCalculation }>()
);
export const ProcessActiveFailed = createAction(
  ShipActionTypes.PROCESS_ACTIVE_FAILED
);

export const EquipEquipment = createAction(ShipActionTypes.EQUIP_EQUIPMENT);

export const SetActiveSlots = createAction(
  ShipActionTypes.SET_ACTIVE_SLOTS,
  props<{
    slots: IShipEquippedSlots;
  }>()
);
export const ClearActiveSlots = createAction(
  ShipActionTypes.CLEAR_ACTIVE_SLOTS
);

export const ShipActions = {
  SetActiveShip,
  ClearActiveShip,
  SetActiveShipStat,
  ClearActiveShipStat,
  LoadArray,
  LoadArraySuccess,
  LoadArrayFailed,
  ProcessActive,
  ProcessActiveSuccess,
  ProcessActiveFailed,
  EquipEquipment,
  SetActiveSlots,
  ClearActiveSlots,
};
