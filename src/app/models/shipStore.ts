import {
  IShip,
  IShipBuff,
  IShipEquippedSlots,
  IShipStat,
} from '@app/models/ship';

export interface IShipCalculationSlot {
  damage: number;
  cooldown: number;
  raw: number;
  light?: number;
  medium?: number;
  heavy?: number;
}

export interface IShipCalculation {
  primary?: IShipCalculationSlot;
  secondary?: IShipCalculationSlot;
  tertiary?: IShipCalculationSlot;
}

export interface IShipCalculations {
  ship: IShip;
  shipStat: IShipStat;
  shipBuff: IShipBuff;
  shipSlots: IShipEquippedSlots;
  shipCalculation: IShipCalculation;
}

export interface IShipActive {
  ship?: IShip;
  shipStat?: IShipStat;
  shipBuff?: IShipBuff;
  shipSlots: IShipEquippedSlots;
}

export interface ShipState {
  active: IShipActive;
  calculation?: IShipCalculations;
  array: IShip[];
}
