import { IClass, IEquipment } from './equipment';

export interface IAmmo {
  name: string;
  light: number;
  medium: number;
  heavy: number;
}

export interface IBullet {
  damage: number;
  number: number;
  ammo: IAmmo;
}

export interface IGunClass extends IClass {
  absoluteCooldown: number;
}

export interface IGun extends IEquipment {
  type: 'gun';
  class: IGunClass;
  bullet: IBullet;
  volleyTime: number;
  reload: number;
  coefficient: number;
  firepower: number;
}

export interface IGunCalculation {
  gun: IGun;
  damage: number;
  cooldown: number;
  raw: number;
  light: number;
  medium: number;
  heavy: number;
}
