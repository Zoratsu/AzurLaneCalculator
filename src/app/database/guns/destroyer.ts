import { EquipmentType } from '@app/models/equipment';
import { IGun, IGunClass } from '@app/models/gun';
import { ShipClass } from '@app/models/ship';

const ammo = {
  default: { name: 'Manual', light: 1, medium: 1, heavy: 1 },
  normal: { name: 'Normal', light: 1, medium: 0.5, heavy: 0.2 },
  normal1: { name: 'Normal*', light: 1, medium: 0.55, heavy: 0.25 },
  normal2: { name: 'Normal+', light: 1, medium: 0.6, heavy: 0.2 },
  he: { name: 'HE', light: 1.2, medium: 0.6, heavy: 0.6 },
  ap: { name: 'AP', light: 0.9, medium: 0.7, heavy: 0.4 },
};
const gunClass: IGunClass = {
  name: ShipClass.dd,
  absoluteCooldown: 0.26,
};
const gunType = EquipmentType.gun;

export const destroyerGuns: IGun[] = [
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
    name: 'Twin 130mm (B-2LM)',
    class: gunClass,
    bullet: {
      damage: 15,
      number: 6,
      ammo: ammo.normal1,
    },
    volleyTime: 0.16,
    reload: 1.73,
    coefficient: 1.48,
    firepower: 35,
  },
];
