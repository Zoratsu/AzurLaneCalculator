import { Injectable } from '@angular/core';
import { IShip, IShipCalculation } from '@app/models/ship';
import { Observable, of } from 'rxjs';
import { IGun, IGunCalculation } from '../models/gun';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  constructor() {}

  public calculateShipDps(
    gunCalculation?: IGunCalculation,
    ship?: IShip
  ): Observable<IShipCalculation> {
    if (gunCalculation && ship) {
      const cooldown =
        Math.round(
          (this.getPureCD(gunCalculation, ship) +
            gunCalculation.gun.volleyTime +
            gunCalculation.gun.class.absoluteCooldown) *
            100
        ) / 100;
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
    return (
      gunCalculation.gun.reload *
      Math.round(Math.sqrt(200 / (ship.reload * (1 + ship.buff.reload) + 100)))
    );
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
