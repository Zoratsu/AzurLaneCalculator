import { IShip } from '@app/models/ship';
import { data as heavyCruiser } from './ca.json';
import { data as largeCruiser } from './cb.json';
import { data as lightCruiser } from './cl.json';
import { data as destroyer } from './dd.json';

export const destroyerShips = destroyer as IShip[];
export const lightCruiserShips = lightCruiser as IShip[];
export const heavyCruiserShips = heavyCruiser as IShip[];
export const largeCruiserShips = largeCruiser as IShip[];

//TODO crear Manual ships
