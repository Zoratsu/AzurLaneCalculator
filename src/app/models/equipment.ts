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
  damage: IEquipmentDamage;
  rateOfFire: number;
  volleyTime: number;
  coefficient: number;
  ammoType?: IAmmo;
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

export interface IEquipmentCalculation {
  equipment: IEquipment;
  tier: IEquipmentTier;
  damage: number;
  cooldown: number;
  raw: number;
  light?: number;
  medium?: number;
  heavy?: number;
}

export enum EquipmentAbsoluteCooldown {
  'dd' = 0.26,
  'cl' = 0.28,
  'ca' = 0.3,
  'cb' = 0.3,
  'aa' = 0.5,
  'default' = 0,
}

export enum EquipmentType {
  'dd' = 'Destroyer Gun',
  'cl' = 'Light Cruiser Gun',
  'ca' = 'Heavy Cruiser Gun',
  'cb' = 'Large Cruiser Gun',
  /*  'sca' = 'Submarine Heavy Cruiser Gun',
  'bb' = 'Battleship Gun',
  'torpSurf' = 'Ship Torpedoes',
  'torpSubs' = 'Submarine Torpedoes',
  'aa' = 'Anti-Air Guns',
  'aux' = 'Auxiliar',
  'ff' = 'Fighters',
  'db' = 'Dive Bombers',
  'tb' = 'Torpedo Bombers',
  'sp' = 'Seaplane',
  'cargo' = 'Munition Ship Cargo',*/
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
