import { Injectable } from '@angular/core';
import {
  destroyerGuns,
  heavyCruiserGuns,
  largeCruiserGuns,
  lightCruiserGuns,
} from '@app/database/guns';
import { destroyerShips } from '@app/database/ships/destroyer';
import { heavyCruiserShips } from '@app/database/ships/heavy-cruiser';
import { largeCruiserShips } from '@app/database/ships/large-cruiser';
import { lightCruiserShips } from '@app/database/ships/light-cruiser';
import { IGun } from '@app/models/gun';
import { IShip } from '@app/models/ship';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor() {}

  public getDestroyerGuns(name?: string): IGun[] {
    if (name) {
      return destroyerGuns.filter((gun) => gun.name.includes(name));
    }
    return destroyerGuns;
  }

  public getLightCruiserGuns(name?: string): IGun[] {
    if (name) {
      return lightCruiserGuns.filter((gun) => gun.name.includes(name));
    }
    return lightCruiserGuns;
  }

  public getHeavyCruiserGuns(name?: string): IGun[] {
    if (name) {
      return heavyCruiserGuns.filter((gun) => gun.name.includes(name));
    }
    return heavyCruiserGuns;
  }

  public getLargeCruiserGuns(name?: string): IGun[] {
    if (name) {
      return largeCruiserGuns.filter((gun) => gun.name.includes(name));
    }
    return largeCruiserGuns;
  }

  public getDestroyers(name?: string): IShip[] {
    if (name) {
      return destroyerShips.filter((ship) => ship.name.includes(name));
    }
    return destroyerShips;
  }
  public getLightCruisers(name?: string): IShip[] {
    if (name) {
      return lightCruiserShips.filter((ship) => ship.name.includes(name));
    }
    return lightCruiserShips;
  }
  public getHeavyCruisers(name?: string): IShip[] {
    if (name) {
      return heavyCruiserShips.filter((ship) => ship.name.includes(name));
    }
    return heavyCruiserShips;
  }
  public getLargeCruisers(name?: string): IShip[] {
    if (name) {
      return largeCruiserShips.filter((ship) => ship.name.includes(name));
    }
    return largeCruiserShips;
  }
}
