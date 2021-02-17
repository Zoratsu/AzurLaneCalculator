import { EquipmentType } from '@app/models/equipment';
import { IGun, IGunClass } from '@app/models/gun';
import { ShipClass } from '@app/models/ship';

const ammo = {
  default: { name: 'Manual', light: 1, medium: 1, heavy: 1 },
  normal: { name: 'Normal', light: 1, medium: 0.75, heavy: 0.4 },
  he: { name: 'HE', light: 1.4, medium: 0.9, heavy: 0.7 },
  he1: { name: 'HE+', light: 1.45, medium: 1.05, heavy: 0.7 },
  he2: { name: 'HE++', light: 1.45, medium: 1.1, heavy: 0.75 },
  ap: { name: 'AP', light: 1, medium: 0.8, heavy: 0.6 },
  ap1: { name: 'AP+', light: 1.1, medium: 0.9, heavy: 0.7 },
};

const gunClass: IGunClass = {
  name: ShipClass.cb,
  absoluteCooldown: 0.28,
};
const gunType = EquipmentType.gun;

export const lightCruiserGuns: IGun[] = [
  {
    type: gunType,
    name: 'Manual',
    class: gunClass,
    bullet: {
      damage: 1,
      number: 1,
      ammo: ammo.default,
    },
    volleyTime: 1,
    reload: 1,
    coefficient: 1,
    firepower: 1,
  },
  {
    type: gunType,
    name: 'Single 152mm (6"/45 Pattern 1892)',
    class: gunClass,
    bullet: {
      damage: 34,
      number: 3,
      ammo: ammo.normal,
    },
    volleyTime: 0.4,
    reload: 2.43,
    coefficient: 1.14,
    firepower: 12,
  },
];
