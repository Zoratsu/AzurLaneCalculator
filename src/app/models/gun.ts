import { IAmmo } from './ammo';
import { IEquipment, IEquipmentTier } from './equipment';

export interface IGunDamage {
  value: number;
  multiplier: number;
}

export interface IGunTier extends IEquipmentTier {
  firepower: number;
  antiAir: number;
  damage: IGunDamage;
  rateOfFire: number;
  volleyTime: number;
  coefficient: number;
  ammoType: IAmmo;
}

export interface IGunTiers {
  t0?: IGunTier;
  t1?: IGunTier;
  t2?: IGunTier;
  t3?: IGunTier;
}

export interface IGun extends IEquipment {
  absoluteCooldown: GunAbsoluteCooldown;
  tiers: IGunTiers;
}

export enum GunAbsoluteCooldown {
  'dd' = 0.26,
  'cl' = 0.28,
  'ca' = 0.3,
  'cb' = 0.3,
}

export interface IGunCalculation {
  gun: IGun;
  tier: IGunTier;
  damage: number;
  cooldown: number;
  raw: number;
  light: number;
  medium: number;
  heavy: number;
}
