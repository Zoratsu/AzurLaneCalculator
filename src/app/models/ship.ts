import { IGun } from '@app/models/gun';

export interface IShipBuff {
  firepower: number;
  damage: number;
  reload: number;
}

export interface IShip {
  firepower: number;
  reload: number;
  gunMounts: number;
  slotEfficiency: number;
  buff: IShipBuff;
}

export interface IShipCalculation {
  gun: IGun;
  ship: IShip;
  damage: number;
  damageMounts: number;
  cooldown: number;
  cooldownMounts: number;
  raw: number;
  rawMounts: number;
  light: number;
  lightMounts: number;
  medium: number;
  mediumMounts: number;
  heavy: number;
  heavyMounts: number;
}
