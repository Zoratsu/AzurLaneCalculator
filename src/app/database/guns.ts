import { IGun } from '@app/models/gun';

const ammo = {
  dd: {
    default: { name: 'Manual', light: 1, medium: 1, heavy: 1 },
    normal: { name: 'Normal', light: 1, medium: 0.5, heavy: 0.2 },
    normal1: { name: 'Normal*', light: 1, medium: 0.55, heavy: 0.25 },
    normal2: { name: 'Normal+', light: 1, medium: 0.6, heavy: 0.2 },
    he: { name: 'HE', light: 1.2, medium: 0.6, heavy: 0.6 },
    ap: { name: 'AP', light: 0.9, medium: 0.7, heavy: 0.4 },
  },
};

export const guns: IGun[] = [
  {
    type: 'gun',
    name: 'Manual',
    class: { name: 'dd', absoluteCooldown: 0.26 },
    bullet: {
      damage: 1,
      number: 1,
      ammo: ammo.dd.default,
    },
    volleyTime: 1,
    reload: 1,
    coefficient: 1,
    firepower: 1,
  },
  {
    type: 'gun',
    name: 'Quadruple 130mm (Mle 1932)',
    class: { name: 'dd', absoluteCooldown: 0.26 },
    bullet: {
      damage: 10,
      number: 4,
      ammo: ammo.dd.normal,
    },
    volleyTime: 0,
    reload: 1.28,
    coefficient: 1.3,
    firepower: 12,
  },
  {
    type: 'gun',
    name: 'Single 100mm (Type 88)',
    class: { name: 'dd', absoluteCooldown: 0.26 },
    bullet: {
      damage: 9,
      number: 4,
      ammo: ammo.dd.normal,
    },
    volleyTime: 0.1,
    reload: 1.32,
    coefficient: 1.14,
    firepower: 10,
  },
  {
    type: 'gun',
    name: 'Twin 130mm (B-2LM)',
    class: { name: 'dd', absoluteCooldown: 0.26 },
    bullet: {
      damage: 15,
      number: 6,
      ammo: ammo.dd.normal1,
    },
    volleyTime: 0.16,
    reload: 1.73,
    coefficient: 1.48,
    firepower: 35,
  },
];
