import { Nation } from '@app/models/nation';
import { IShip, IShipBuff, IShipStat } from '@app/models/ship';
import {
  IShipCalculations,
  IShipEquippedSlots,
  IShipSlotsEfficiencies,
} from '@app/models/shipStore';
import { createAction, props } from '@ngrx/store';

export enum ShipActionTypes {
  LOAD_ARRAY = '[SHIP] Load Array',
  LOAD_ARRAY_SUCCESS = '[SHIP] Load Array Success',
  LOAD_ARRAY_FAILED = '[SHIP] Load Array Failed',
  SET_ACTIVE_SHIP = '[SHIP] Set Active Ship',
  CLEAR_ACTIVE_SHIP = '[SHIP] Clear Active Ship',
  SET_ACTIVE_SHIP_STAT = '[SHIP] Set Active Ship Stat',
  CLEAR_ACTIVE_SHIP_STAT = '[SHIP] Clear Active Ship Stat',
  SET_ACTIVE_SHIP_SLOT_EFFICIENCIES = '[SHIP] Set Active Ship Slot Efficiencies',
  CLEAR_ACTIVE_SHIP_SLOT_EFFICIENCIES = '[SHIP] Clear Active Ship Slot Efficiencies',
  SET_ACTIVE_SHIP_BUFF = '[SHIP] Set Active Ship Buff',
  CLEAR_ACTIVE_SHIP_BUFF = '[SHIP] Clear Active Ship Buff',
  EQUIP_EQUIPMENT = '[SHIP] Equip Equipment In Active Slot',
  SET_ACTIVE_SHIP_SLOTS = '[SHIP] Set Active Ship Slots',
  CLEAR_ACTIVE_SHIP_SLOTS = '[SHIP] Clear Active Ship Slots',
  PROCESS_ACTIVE = '[SHIP] Process Active',
  PROCESS_ACTIVE_SUCCESS = '[SHIP] Process Active Success',
  PROCESS_ACTIVE_FAILED = '[SHIP] Process Active Failed',
}

export const LoadArray = createAction(
  ShipActionTypes.LOAD_ARRAY,
  props<{ nation?: Nation }>()
);
export const LoadArraySuccess = createAction(
  ShipActionTypes.LOAD_ARRAY_SUCCESS,
  props<{ ships: IShip[] }>()
);
export const LoadArrayFailed = createAction(ShipActionTypes.LOAD_ARRAY_FAILED);

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

export const SetActiveShipSlotEfficiencies = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP_SLOT_EFFICIENCIES,
  props<{ shipSlotsEfficiencies: IShipSlotsEfficiencies }>()
);
export const ClearActiveShipSlotEfficiencies = createAction(
  ShipActionTypes.CLEAR_ACTIVE_SHIP_SLOT_EFFICIENCIES
);

export const SetActiveShipBuff = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP_BUFF,
  props<{ shipBuff: IShipBuff }>()
);
export const ClearActiveShipBuff = createAction(
  ShipActionTypes.CLEAR_ACTIVE_SHIP_BUFF
);

export const EquipEquipment = createAction(ShipActionTypes.EQUIP_EQUIPMENT);

export const SetActiveShipSlots = createAction(
  ShipActionTypes.SET_ACTIVE_SHIP_SLOTS,
  props<{
    slots: IShipEquippedSlots;
  }>()
);
export const ClearActiveShipSlots = createAction(
  ShipActionTypes.CLEAR_ACTIVE_SHIP_SLOTS
);

export const ProcessActive = createAction(ShipActionTypes.PROCESS_ACTIVE);
export const ProcessActiveSuccess = createAction(
  ShipActionTypes.PROCESS_ACTIVE_SUCCESS,
  props<{ calculation: IShipCalculations }>()
);
export const ProcessActiveFailed = createAction(
  ShipActionTypes.PROCESS_ACTIVE_FAILED
);

export const ShipActions = {
  LoadArray,
  LoadArraySuccess,
  LoadArrayFailed,
  SetActiveShip,
  ClearActiveShip,
  SetActiveShipStat,
  ClearActiveShipStat,
  SetActiveShipSlotEfficiencies,
  ClearActiveShipSlotEfficiencies,
  SetActiveShipBuff,
  ClearActiveShipBuff,
  EquipEquipment,
  SetActiveShipSlots,
  ClearActiveShipSlots,
  ProcessActive,
  ProcessActiveSuccess,
  ProcessActiveFailed,
};
