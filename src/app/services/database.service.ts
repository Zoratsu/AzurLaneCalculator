import { Injectable } from '@angular/core';
import {
  destroyerGuns,
  heavyCruiserGuns,
  largeCruiserGuns,
  lightCruiserGuns,
} from '@app/database/guns';
import {
  destroyerShips,
  heavyCruiserShips,
  largeCruiserShips,
  lightCruiserShips,
} from '@app/database/ships';
import { EquipmentType } from '@app/models/equipment';
import { IGun } from '@app/models/gun';
import { Nation } from '@app/models/nation';
import { IShip } from '@app/models/ship';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor() {}

  public getDestroyerGuns(nation?: Nation): IGun[] {
    if (nation && nation !== Nation.default) {
      return destroyerGuns.filter((gun) => gun.nation === nation);
    }
    return destroyerGuns;
  }

  public getLightCruiserGuns(nation?: Nation): IGun[] {
    if (nation && nation !== Nation.default) {
      return lightCruiserGuns.filter((gun) => gun.nation === nation);
    }
    return lightCruiserGuns;
  }

  public getHeavyCruiserGuns(nation?: Nation): IGun[] {
    if (nation && nation !== Nation.default) {
      return heavyCruiserGuns.filter((gun) => gun.nation === nation);
    }
    return heavyCruiserGuns;
  }

  public getLargeCruiserGuns(nation?: Nation): IGun[] {
    if (nation && nation !== Nation.default) {
      return largeCruiserGuns.filter((gun) => gun.nation === nation);
    }
    return largeCruiserGuns;
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
      let array: IGun[] = [];
      equipment.forEach((e) => array.concat(this.processEquipment(e)));
      return array;
    } else {
      return this.processEquipment(equipment);
    }
  }

  private processEquipment(equipment: EquipmentType): IGun[] {
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
