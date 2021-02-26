import { IEquipment } from '@app/models/equipment';
import { data as lightCruiser } from './cl.json';
import { data as destroyer } from './dd.json';
import { data as heavyCruiser } from './ca.json';
import { data as largeCruiser } from './cb.json';
import { data as battleship } from './bb.json';

export const destroyerGuns = destroyer as IEquipment[];
export const lightCruiserGuns = lightCruiser as IEquipment[];
export const heavyCruiserGuns = heavyCruiser as IEquipment[];
export const largeCruiserGuns = largeCruiser as IEquipment[];
export const battleshipGuns = battleship as IEquipment[];

//TODO crear Manual Guns
