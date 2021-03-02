import { IAmmo } from './ammo';
import { Nation } from './nation';

export interface IEquipment {
  id: string;
  name: string;
  type: EquipmentType;
  nation: Nation;
  image: string;
  tiers: IEquipmentTiers;
  absoluteCooldown: EquipmentAbsoluteCooldown;
}

export interface IEquipmentTier {
  rarity: Rarity;
  stars: Stars;
  firepower: number;
  torpedo: number;
  antiAir: number;
  aviation: number;
  damage?: IEquipmentDamage;
  damageArray?: IEquipmentDamage[];
  rateOfFire: number;
  volleyTime: number;
  coefficient: number;
  range?: IEquipmentRange;
  volley?: IEquipmentVolley;
  ammoType?: IAmmo;
  ammoTypeArray?: IAmmo[];
}

export interface IEquipmentTiers {
  t0?: IEquipmentTier;
  t1?: IEquipmentTier;
  t2?: IEquipmentTier;
  t3?: IEquipmentTier;
}

export interface IEquipmentDamage {
  value: number;
  multiplier: number;
}

export interface IEquipmentTiers {
  t0?: IEquipmentTier;
  t1?: IEquipmentTier;
  t2?: IEquipmentTier;
  t3?: IEquipmentTier;
}

export interface IEquipmentDamage {
  value: number;
  multiplier: number;
}

export interface IEquipmentRange {
  firing: number;
  distance: number;
}

export interface IEquipmentVolley {
  count: number;
  multiplier: number;
}
export enum EquipmentAbsoluteCooldown {
  'dd' = 0.26,
  'cl' = 0.28,
  'ca' = 0.3,
  'cb' = 0.3,
  'aa' = 0.5,
  'plane' = 0.1,
  'default' = 0,
}

export enum EquipmentType {
  'dd' = 'Destroyer Gun',
  'cl' = 'Light Cruiser Gun',
  'ca' = 'Heavy Cruiser Gun',
  'cb' = 'Large Cruiser Gun',
  'bb' = 'Battleship Gun',
  'torpSurf' = 'Ship Torpedoes',
  'torpSubs' = 'Submarine Torpedoes',
  'aa' = 'Anti-Air Guns',
  'ff' = 'Fighters',
  'db' = 'Dive Bombers',
  'tb' = 'Torpedo Bombers',
  'sp' = 'Seaplane',
  'default' = 'Manual',
}

export enum Rarity {
  'n' = 'Normal',
  'r' = 'Rare',
  'e' = 'Elite',
  'sr' = 'Super Rare',
  'ur' = 'Ultra Rare',
  'default' = 'Not Found',
}

export enum Stars {
  'default' = '',
  's1' = '★',
  's2' = '★★',
  's3' = '★★★',
  's4' = '★★★★',
  's5' = '★★★★★',
  's6' = '★★★★★★',
}
