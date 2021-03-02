import { IEquipment } from '@app/models/equipment';
import { data as lightCruiser } from './cl.json';
import { data as destroyer } from './dd.json';
import { data as heavyCruiser } from './ca.json';
import { data as largeCruiser } from './cb.json';
import { data as battleship } from './bb.json';
import { data as submarine } from './torpSubs.json';
import { data as surface } from './torpSurf.json';
import { data as antiAir } from './aa.json';

import { data as fighter } from './ff.json';
import { data as diveBomber } from './db.json';
import { data as torpedoBomber } from './tb.json';
import { data as seaplane } from './sp.json';

export const destroyerGuns = destroyer as IEquipment[];
export const lightCruiserGuns = lightCruiser as IEquipment[];
export const heavyCruiserGuns = heavyCruiser as IEquipment[];
export const largeCruiserGuns = largeCruiser as IEquipment[];
export const battleshipGuns = battleship as IEquipment[];

export const submarineTorpedoes = submarine as IEquipment[];
export const surfaceTorpedoes = surface as IEquipment[];

export const antiAirGuns = antiAir as IEquipment[];

export const fighters = fighter as IEquipment[];
export const diveBombers = diveBomber as IEquipment[];
export const torpedoBombers = torpedoBomber as IEquipment[];
export const seaplanes = seaplane as IEquipment[];
