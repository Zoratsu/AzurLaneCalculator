import { Nation } from '@app/models/nation';

export interface IEquipment {
  name: string;
  type: EquipmentType;
  nation: Nation;
  image: string;
}

export enum EquipmentType {
  'dd' = 'Destroyer Gun',
  'cl' = 'Light Cruiser Gun',
  'ca' = 'Heavy Cruiser Gun',
  'cb' = 'Large Cruiser Gun',
  /*'sca' = 'Submarine Heavy Cruiser Gun',
  'bb' = 'Battleship Gun',
  'torpSurf' = 'Ship Torpedoes',
  'torpSubs' = 'Submarine Torpedoes',
  'aa' = 'Anti-Air Guns',
  'aux' = 'Auxiliar',
  'ff' = 'Fighters',
  'db' = 'Dive Bombers',
  'tb' = 'Torpedo Bombers',
  'sp' = 'Seaplane',
  'cargo' = 'Munition Ship Cargo',*/
  'default' = 'Manual',
}

export enum Rarity {
  'c' = 'Common',
  'r' = 'Rare',
  'sr' = 'Super Rare',
  'default' = 'Manual',
}

export enum Stars {
  'default' = '',
  's1' = '1',
  's2' = '2',
  's3' = '3',
  's4' = '4',
  's5' = '5',
}
