import {
  IShip,
  IShipBuff,
  IShipEquippedSlot,
  IShipStat,
} from '@app/models/ship';

export interface IShipCalculationSlot {
  damage: number;
  cooldown: number;
  raw: number;
  light?: number;
  medium?: number;
  heavy?: number;
  lightDamage?: number;
  mediumDamage?: number;
  heavyDamage?: number;
}

export interface IShipCalculation {
  primary?: IShipCalculationSlot;
  secondary?: IShipCalculationSlot;
  tertiary?: IShipCalculationSlot;
  advanced?: IShipCalculationAdvanced;
}

export interface IShipCalculationAdvanced {
  antiAir?: IShipCalculationSlot;
  aviation?: IShipCalculationSlot;
  mgm?: {
    primary?: IShipCalculationSlot;
    secondary?: IShipCalculationSlot;
    tertiary?: IShipCalculationSlot;
  };
}

export interface IShipCalculations {
  ship: IShip;
  shipStat: IShipStat;
  shipBuff: IShipBuff;
  shipSlots: IShipEquippedSlots;
  shipCalculation: IShipCalculation;
}

export interface IShipEquippedSlots {
  primary?: IShipEquippedSlot;
  secondary?: IShipEquippedSlot;
  tertiary?: IShipEquippedSlot;
}

export interface IShipSlotsEfficiencies {
  primary: number;
  primaryMount: number;
  secondary: number;
  secondaryMount: number;
  tertiary: number;
  tertiaryMount: number;
}

export interface IShipActive {
  ship?: IShip;
  shipStat?: IShipStat;
  shipBuff: IShipBuff;
  shipSlots?: IShipEquippedSlots;
  shipSlotsEfficiencies?: IShipSlotsEfficiencies;
}

export interface ShipState {
  active: IShipActive;
  calculation?: IShipCalculations;
  array: IShip[];
}
