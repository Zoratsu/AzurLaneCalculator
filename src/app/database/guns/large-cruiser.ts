import { EquipmentType } from '@app/models/equipment';
import { IGun, IGunClass } from '@app/models/gun';
import { ShipClass } from '@app/models/ship';

const ammo = {
  default: { name: 'Manual', light: 1, medium: 1, heavy: 1 },
  he: { name: 'HE', light: 1.35, medium: 1, heavy: 0.75 },
  ap: { name: 'AP', light: 0.75, medium: 1.1, heavy: 0.75 },
};

const gunClass: IGunClass = {
  name: ShipClass.cb,
  absoluteCooldown: 0.3,
};
const gunType = EquipmentType.gun;

export const largeCruiserGuns: IGun[] = [
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
    name: 'Triple 310mm (Type 0 Prototype)',
    class: gunClass,
    bullet: {
      damage: 56,
      number: 6,
      ammo: ammo.he,
    },
    volleyTime: 0.5,
    reload: 10.71,
    coefficient: 1.3,
    firepower: 45,
  },
];
