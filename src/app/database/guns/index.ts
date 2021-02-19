import { IGun } from '@app/models/gun';
import { data as heavyCruiser } from './ca.json';
import { data as largeCruiser } from './cb.json';
import { data as lightCruiser } from './cl.json';
import { data as destroyer } from './dd.json';

export const destroyerGuns = destroyer as IGun[];
export const lightCruiserGuns = lightCruiser as IGun[];
export const heavyCruiserGuns = heavyCruiser as IGun[];
export const largeCruiserGuns = largeCruiser as IGun[];

//TODO crear Manual Guns
