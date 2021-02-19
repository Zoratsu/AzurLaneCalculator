import { Nation } from '@app/models/nation';

export interface IEquipment {
  name: string;
  type: EquipmentType;
  nation: Nation;
}

export enum EquipmentType {
  'dd' = 'Destroyer Gun',
  'cl' = 'Light Cruiser Gun',
  'ca' = 'Heavy Cruiser Gun',
  'sca' = 'Submarine Heavy Cruiser Gun',
  'cb' = 'Large Cruiser Gun',
  'bb' = 'Battleship Gun',
  'torpSurf' = 'Torpedoes Surface',
  'torpSubs' = 'Torpedoes Submarine',
  'aa' = 'Anti-Air Guns',
  'aux' = 'Auxiliar',
  'ff' = 'Fighters',
  'db' = 'Dive Bombers',
  'tb' = 'Torpedo Bombers',
  'sp' = 'Seaplane',
  'cargo' = 'Munition Ship Cargo',
  'default' = 'Not Found',
}

export enum Rarity {
  'c' = 'Common',
  'r' = 'Rare',
  'sr' = 'Super Rare',
  'default' = 'Not Found',
}

export enum Stars {
  'default' = '',
  's1' = '1',
  's2' = '2',
  's3' = '3',
  's4' = '4',
  's5' = '5',
}
