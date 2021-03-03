import { EquipmentType, IEquipment, IEquipmentTier } from './equipment';
import { Nation } from './nation';

export interface IShipBuff {
  damage: number;
  antiAir: number;
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
  antiAir: number;
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

export interface IShipEquippedSlot {
  equipment: IEquipment;
  tier: IEquipmentTier;
}

export interface IShipEquippedStats {
  antiAir: number;
  aviation: number;
  firepower: number;
  torpedo: number;
}

export enum SlotID {
  'primary' = 1,
  'secondary' = 2,
  'tertiary' = 3,
}

export enum HullType {
  'dd' = 'Destroyer',
  'cl' = 'Light Cruiser',
  'ca' = 'Heavy Cruiser',
  'cb' = 'Large Cruiser',
  'bb' = 'Battleship',
  'bc' = 'Battlecruiser',
  'bm' = 'Monitor',
  'ss' = 'Submarine',
  'cv' = 'Aircraft Carrier',
  'cvl' = 'Light Carrier',
  //'ar' = 'Repair',
  //'ssv' = 'Submarine Carrier',
  //'ae' = 'Munition Ship',
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
