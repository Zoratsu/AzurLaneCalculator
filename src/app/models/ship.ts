import { EquipmentType, IEquipment, IEquipmentTier } from './equipment';
import { Nation } from './nation';

export interface IShipBuff {
  damage: number;
  antiair: number;
  reload: number;
  firepower: number;
  torpedo: number;
  aviation: number;
}

export interface IShip {
  id: string;
  name: string;
  nation: Nation;
  hullType: HullType;
  retrofitHullType?: HullType;
  shipClass: string;
  stats: IShipStats;
  slots: IShipSlots;
  image: string;
}

export interface IShipStats {
  baseStats: IShipStat;
  level100: IShipStat;
  level120: IShipStat;
  level100Retrofit?: IShipStat;
  level120Retrofit?: IShipStat;
}

export interface IShipStat {
  name: ShipStatName;
  health: number;
  armor: ShipArmor;
  reload: number;
  luck: number;
  firepower: number;
  torpedo: number;
  evasion: number;
  speed: number;
  antiair: number;
  aviation: number;
  oilConsumption: number;
  accuracy: number;
}

export interface IShipSlot {
  id: SlotID;
  minType: EquipmentType | EquipmentType[];
  maxType: EquipmentType | EquipmentType[];
  retroType?: EquipmentType | EquipmentType[];
  minEfficiency: number;
  maxEfficiency: number;
  kaiEfficiency?: number;
}

export interface IShipSlots {
  primary: IShipSlot;
  secondary: IShipSlot;
  tertiary: IShipSlot;
}

export interface IShipEquippedSlots {
  primary?: { equipment: IEquipment; tier: IEquipmentTier };
  secondary?: { equipment: IEquipment; tier: IEquipmentTier };
  tertiary?: { equipment: IEquipment; tier: IEquipmentTier };
}

export enum SlotID {
  'primary',
  'secondary',
  'tertiary',
}

export enum HullType {
  'dd' = 'Destroyer',
  'cl' = 'Light Cruiser',
  'ca' = 'Heavy Cruiser',
  'cb' = 'Large Cruiser',
  /*  'bb' = 'Battleship',
  'bc' = 'Battlecruiser',
  'cv' = 'Aircraft Carrier',
  'cvl' = 'Light Carrier',
  'bm' = 'Monitor',
  'ar' = 'Repair',
  'ss' = 'Submarine',
  'ssv' = 'Submarine Carrier',
  'ae' = 'Munition Ship',*/
  'default' = 'Manual',
}

export enum ShipArmor {
  'l' = 'Light',
  'm' = 'Medium',
  'h' = 'Heavy',
}

export enum ShipStatName {
  'default' = 'Level 1',
  'lvl100' = 'Level 100',
  'lvl120' = 'Level 120',
  'lvl100Retro' = 'Level 100 Retrofit',
  'lvl120Retro' = 'Level 120 Retrofit',
}

export interface IShipCalculation {
  gun: IEquipment;
  ship: IShip;
  damage: number;
  cooldown: number;
  raw: number;
  light?: number;
  medium?: number;
  heavy?: number;
}
