import { Injectable } from '@angular/core';
import {
  battleshipGuns,
  destroyerGuns,
  heavyCruiserGuns,
  largeCruiserGuns,
  lightCruiserGuns,
} from '@app/database/equipment';
import {
  destroyerShips,
  heavyCruiserShips,
  largeCruiserShips,
  lightCruiserShips,
} from '@app/database/ships';
import { EquipmentType, IEquipment } from '@app/models/equipment';
import { Nation } from '@app/models/nation';
import { IShip } from '@app/models/ship';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor() {}

  public getDestroyerGuns(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return destroyerGuns.filter((equipment) => equipment.nation === nation);
    }
    return destroyerGuns;
  }

  public getLightCruiserGuns(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return lightCruiserGuns.filter(
        (equipment) => equipment.nation === nation
      );
    }
    return lightCruiserGuns;
  }

  public getHeavyCruiserGuns(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return heavyCruiserGuns.filter(
        (equipment) => equipment.nation === nation
      );
    }
    return heavyCruiserGuns;
  }

  public getLargeCruiserGuns(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return largeCruiserGuns.filter(
        (equipment) => equipment.nation === nation
      );
    }
    return largeCruiserGuns;
  }

  public getBattleshipGuns(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return battleshipGuns.filter((equipment) => equipment.nation === nation);
    }
    return battleshipGuns;
  }

  public getDestroyers(nation?: Nation): IShip[] {
    if (nation && nation !== Nation.default) {
      return destroyerShips.filter((ship) => ship.nation === nation);
    }
    return destroyerShips;
  }

  public getLightCruisers(nation?: Nation): IShip[] {
    if (nation && nation !== Nation.default) {
      return lightCruiserShips.filter((ship) => ship.nation === nation);
    }
    return lightCruiserShips;
  }

  public getHeavyCruisers(nation?: Nation): IShip[] {
    if (nation && nation !== Nation.default) {
      return heavyCruiserShips.filter((ship) => ship.nation === nation);
    }
    return heavyCruiserShips;
  }

  public getLargeCruisers(nation?: Nation): IShip[] {
    if (nation && nation !== Nation.default) {
      return largeCruiserShips.filter((ship) => ship.nation === nation);
    }
    return largeCruiserShips;
  }

  public getGuns(equipment: EquipmentType | EquipmentType[]) {
    if (Array.isArray(equipment)) {
      let array: IEquipment[] = [];
      equipment.forEach((e) => array.concat(this.processEquipment(e)));
      return array;
    } else {
      return this.processEquipment(equipment);
    }
  }

  private processEquipment(equipment: EquipmentType): IEquipment[] {
    const e = equipment as EquipmentType;
    switch (e) {
      case EquipmentType.dd:
        return this.getDestroyerGuns();
      case EquipmentType.cl:
        return this.getLightCruiserGuns();
      case EquipmentType.ca:
        return this.getHeavyCruiserGuns();
      case EquipmentType.cb:
        return this.getLargeCruiserGuns();
      default:
        return [];
    }
  }
}
