import { Injectable } from '@angular/core';
import { IShip, IShipCalculation, ShipClass } from '@app/models/ship';
import { DatabaseService } from '@app/services/database.service';
import { Observable, of } from 'rxjs';
import { IGun, IGunCalculation } from '../models/gun';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  constructor(private databaseService: DatabaseService) {}

  public getShips(
    shipClass: ShipClass,
    shipName?: string
  ): Observable<IShip[]> {
    let ships: IShip[];
    switch (shipClass) {
      case ShipClass.dd:
        ships = this.databaseService.getDestroyers(shipName);
        break;
      case ShipClass.cl:
        ships = this.databaseService.getLightCruisers(shipName);
        break;
      case ShipClass.ca:
        ships = this.databaseService.getHeavyCruisers(shipName);
        break;
      case ShipClass.cb:
        ships = this.databaseService.getLargeCruisers(shipName);
        break;
      default:
        ships = [];
        break;
    }
    return of(ships);
  }

  public calculateShipDps(
    gunCalculation?: IGunCalculation,
    ship?: IShip
  ): Observable<IShipCalculation> {
    if (gunCalculation && ship) {
      const cooldown =
        this.getPureCD(gunCalculation, ship) +
        gunCalculation.gun.volleyTime +
        gunCalculation.gun.class.absoluteCooldown;
      const cooldownMounts =
        this.getPureCD(gunCalculation, ship) +
        this.getExtraCDPerMount(gunCalculation, ship);
      const damage =
        gunCalculation.damage *
        (1 + ship.buff.damage) *
        this.getFirepower(gunCalculation.gun, ship) *
        ship.slotEfficiency;
      const damageMounts = damage * ship.gunMounts;
      const raw = damage / cooldown;
      const rawMounts = damageMounts / cooldownMounts;
      const light = raw * gunCalculation.gun.bullet.ammo.light;
      const lightMounts = rawMounts * gunCalculation.gun.bullet.ammo.light;
      const medium = raw * gunCalculation.gun.bullet.ammo.medium;
      const mediumMounts = rawMounts * gunCalculation.gun.bullet.ammo.medium;
      const heavy = raw * gunCalculation.gun.bullet.ammo.heavy;
      const heavyMounts = rawMounts * gunCalculation.gun.bullet.ammo.heavy;
      return of({
        gun: gunCalculation.gun,
        ship,
        damage,
        damageMounts,
        cooldown,
        cooldownMounts,
        raw,
        rawMounts,
        light,
        lightMounts,
        medium,
        mediumMounts,
        heavy,
        heavyMounts,
      });
    }
    return of();
  }

  private getPureCD(gunCalculation: IGunCalculation, ship: IShip): number {
    const reload = gunCalculation.gun.reload;
    const calc = Math.sqrt(200 / (ship.reload * (1 + ship.buff.reload) + 100));
    return reload * calc;
  }

  private getExtraCDPerMount(
    gunCalculation: IGunCalculation,
    ship: IShip
  ): number {
    return ship.gunMounts > 1
      ? this.getPureCD(gunCalculation, ship) +
          this.getBiggerCD(gunCalculation.gun)
      : 0;
  }

  private getBiggerCD(gun: IGun): number {
    return gun.class.absoluteCooldown > gun.volleyTime
      ? gun.class.absoluteCooldown
      : gun.volleyTime;
  }

  private getFirepower(gun: IGun, ship: IShip): number {
    return (
      (ship.firepower +
        gun.firepower +
        (ship.firepower + gun.firepower) * ship.buff.firepower) /
      100
    );
  }
}
