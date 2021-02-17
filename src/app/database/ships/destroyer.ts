import { IShip, IShipBuff, ShipClass } from '@app/models/ship';

const shipClass = ShipClass.dd;
const buffShip: IShipBuff = { firepower: 0, reload: 0, damage: 0 };

export const destroyerShips: IShip[] = [
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
    name: 'Universal Bulin',
    class: shipClass,
    firepower: 23,
    reload: 116,
    gunMounts: 1,
    slotEfficiency: 1,
    buff: buffShip,
  },
];
