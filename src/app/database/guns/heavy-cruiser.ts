import { EquipmentType } from '@app/models/equipment';
import { IGun, IGunClass } from '@app/models/gun';
import { ShipClass } from '@app/models/ship';

const ammo = {
  default: { name: 'Manual', light: 1, medium: 1, heavy: 1 },
  normal: { name: 'Normal', light: 1, medium: 0.9, heavy: 0.5 },
  normal1: { name: 'NormalPR', light: 1.15, medium: 1.1, heavy: 0.9 },
  normal2: { name: 'NormalDR', light: 1.15, medium: 1.15, heavy: 0.95 },
  he: { name: 'HE', light: 1.35, medium: 0.95, heavy: 0.7 },
  he1: { name: 'HE*', light: 1.35, medium: 0.95, heavy: 0.7 },
  ap: { name: 'AP', light: 0.75, medium: 1.1, heavy: 0.75 },
  ap1: { name: 'AP+', light: 0.75, medium: 1.1, heavy: 0.85 },
  sap: { name: 'SAP', light: 0.65, medium: 1.25, heavy: 0.65 },
};

const gunClass: IGunClass = {
  name: ShipClass.ca,
  absoluteCooldown: 0.3,
};
const gunType = EquipmentType.gun;

export const heavyCruiserGuns: IGun[] = [
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
    name: 'Triple 234mm (BL 9.2" Mk XII Prototype)',
    class: gunClass,
    bullet: {
      damage: 54,
      number: 6,
      ammo: ammo.normal2,
    },
    volleyTime: 0.6,
    reload: 7.85,
    coefficient: 1.36,
    firepower: 65,
  },
];
