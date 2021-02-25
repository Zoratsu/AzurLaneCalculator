import { IEquipment, IEquipmentTier } from '@app/models/equipment';

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

export interface IEquipmentActive {
  equipment?: IEquipment;
  tier?: IEquipmentTier;
}

export interface IEquipmentState {
  active: IEquipmentActive;
  calculation?: IEquipmentCalculation;
  array: IEquipment[];
}
