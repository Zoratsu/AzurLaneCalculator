import { IShip, IShipBuff, ShipClass } from '@app/models/ship';

const shipClass = ShipClass.cl;
const buffShip: IShipBuff = { firepower: 0, reload: 0, damage: 0 };

export const lightCruiserShips: IShip[] = [
  {
    name: 'Manual',
    class: shipClass,
    firepower: 1,
    reload: 1,
    gunMounts: 1,
    slotEfficiency: 1,
    buff: buffShip,
  },
  {
    name: 'Omaha',
    class: shipClass,
    firepower: 142,
    reload: 182,
    gunMounts: 1,
    slotEfficiency: 1.2,
    buff: buffShip,
  },
];
