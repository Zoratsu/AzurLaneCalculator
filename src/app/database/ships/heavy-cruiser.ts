import { IShip, IShipBuff, ShipClass } from '@app/models/ship';

const shipClass = ShipClass.ca;
const buffShip: IShipBuff = { firepower: 0, reload: 0, damage: 0 };

export const heavyCruiserShips: IShip[] = [
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
    name: 'Pensacola',
    class: shipClass,
    firepower: 232,
    reload: 160,
    gunMounts: 2,
    slotEfficiency: 1.2,
    buff: buffShip,
  },
];
