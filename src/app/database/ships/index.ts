import { IShip } from '@app/models/ship';
import { data as destroyer } from './dd.json';
import { data as lightCruiser } from './cl.json';
import { data as heavyCruiser } from './ca.json';
import { data as largeCruiser } from './cb.json';
import { data as battleship } from './bb.json';
import { data as battlecruiser } from './bc.json';
import { data as monitor } from './bm.json';
import { data as submarine } from './ss.json';

export const destroyerShips = destroyer as IShip[];
export const lightCruiserShips = lightCruiser as IShip[];
export const heavyCruiserShips = heavyCruiser as IShip[];
export const largeCruiserShips = largeCruiser as IShip[];
export const battleshipShips = battleship as IShip[];
export const battlecruiserShips = battlecruiser as IShip[];
export const monitorShips = monitor as IShip[];
export const submarines = submarine as IShip[];

//TODO crear Manual ships
