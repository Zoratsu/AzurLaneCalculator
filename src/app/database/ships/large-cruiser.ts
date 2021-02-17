import { IShip, IShipBuff, ShipClass } from '@app/models/ship';

const shipClass = ShipClass.cb;
const buffShip: IShipBuff = { firepower: 0, reload: 0, damage: 0 };

export const largeCruiserShips: IShip[] = [
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
    name: 'Azuma',
    class: shipClass,
    firepower: 307,
    reload: 170,
    gunMounts: 2,
    slotEfficiency: 1,
    buff: buffShip,
  },
];
