import { Injectable } from '@angular/core';
import {
  antiAirGuns,
  battleshipGuns,
  destroyerGuns,
  heavyCruiserGuns,
  largeCruiserGuns,
  lightCruiserGuns,
  submarineTorpedoes,
  surfaceTorpedoes,
} from '@app/database/equipment';
import {
  battlecruiserShips,
  battleshipShips,
  destroyerShips,
  heavyCruiserShips,
  largeCruiserShips,
  lightCruiserShips,
  monitorShips,
  submarines,
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

  public getSurfaceTorpedoes(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return surfaceTorpedoes.filter(
        (equipment) => equipment.nation === nation
      );
    }
    return surfaceTorpedoes;
  }

  public getSubmarineTorpedoes(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return submarineTorpedoes.filter(
        (equipment) => equipment.nation === nation
      );
    }
    return submarineTorpedoes;
  }

  public getAntiAirGuns(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return antiAirGuns.filter((equipment) => equipment.nation === nation);
    }
    return antiAirGuns;
  }

  /*  public getFighters(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return fighters.filter((equipment) => equipment.nation === nation);
    }
    return fighters;
  }

  public getDiveBombers(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return diveBombers.filter((equipment) => equipment.nation === nation);
    }
    return diveBombers;
  }

  public getTorpedoBombers(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return torpedoBombers.filter((equipment) => equipment.nation === nation);
    }
    return torpedoBombers;
  }

  public getSeaplanes(nation?: Nation): IEquipment[] {
    if (nation && nation !== Nation.default) {
      return seaplanes.filter((equipment) => equipment.nation === nation);
    }
    return seaplanes;
  }*/

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

  public getBattleships(nation?: Nation): IShip[] {
    if (nation && nation !== Nation.default) {
      return battleshipShips.filter((ship) => ship.nation === nation);
    }
    return battleshipShips;
  }

  public getBattlecruisers(nation?: Nation): IShip[] {
    if (nation && nation !== Nation.default) {
      return battlecruiserShips.filter((ship) => ship.nation === nation);
    }
    return battlecruiserShips;
  }

  public getMonitors(nation?: Nation): IShip[] {
    if (nation && nation !== Nation.default) {
      return monitorShips.filter((ship) => ship.nation === nation);
    }
    return monitorShips;
  }

  public getSubmarines(nation?: Nation): IShip[] {
    if (nation && nation !== Nation.default) {
      return submarines.filter((ship) => ship.nation === nation);
    }
    return submarines;
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
