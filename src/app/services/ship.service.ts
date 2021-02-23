import { Injectable } from '@angular/core';
import { Nation } from '@app/models/nation';
import {
  IShip,
  IShipCalculation,
  IShipSlot,
  IShipStat,
  HullType,
} from '@app/models/ship';
import { DatabaseService } from '@app/services/database.service';
import { Observable, of } from 'rxjs';
import { IGun, IGunCalculation, IGunTier } from '../models/gun';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  constructor(private databaseService: DatabaseService) {}

  public getShips(shipClass: HullType, nation?: Nation): Observable<IShip[]> {
    let ships: IShip[];
    switch (shipClass) {
      case HullType.dd:
        ships = this.databaseService.getDestroyers(nation);
        break;
      case HullType.cl:
        ships = this.databaseService.getLightCruisers(nation);
        break;
      case HullType.ca:
        ships = this.databaseService.getHeavyCruisers(nation);
        break;
      case HullType.cb:
        ships = this.databaseService.getLargeCruisers(nation);
        break;
      default:
        ships = [];
        break;
    }
    return of(ships);
  }

  public calculateShipDps(
    gunCalculation?: IGunCalculation,
    ship?: IShip,
    shipStat?: IShipStat
  ): Observable<IShipCalculation> {
    if (gunCalculation && ship && shipStat) {
      const { gun, tier } = gunCalculation;
      const cooldown =
        this.getPureCD(tier, ship, shipStat) +
        tier.volleyTime +
        gun.absoluteCooldown;
      const damage =
        gunCalculation.damage *
        (1 + ship.buff.damage) *
        this.getFirepower(tier, ship, shipStat) *
        this.getSlotEfficiency(ship, gun);
      const raw = damage / cooldown;
      const light = raw * tier.ammoType.light;
      const medium = raw * tier.ammoType.medium;
      const heavy = raw * tier.ammoType.heavy;
      return of({
        gun,
        tier,
        ship,
        shipStat,
        damage,
        cooldown,
        raw,
        light,
        medium,
        heavy,
      });
    }
    return of();
  }

  private getPureCD(tier: IGunTier, ship: IShip, shipStat: IShipStat): number {
    const reload = tier.rateOfFire;
    const calc = Math.sqrt(
      200 / (shipStat.reload * (1 + ship.buff.reload) + 100)
    );
    return reload * calc;
  }

  private getFirepower(
    tier: IGunTier,
    ship: IShip,
    shipStat: IShipStat
  ): number {
    const baseFP = shipStat.firepower + tier.firepower;
    return (baseFP + baseFP * ship.buff.firepower) / 100;
  }

  private getSlotEfficiency(ship: IShip, gun: IGun): number {
    const slot = this.getSlot(ship, gun);
    return slot.kaiEfficiency || slot.maxEfficiency;
  }

  private getSlot(ship: IShip, gun: IGun): IShipSlot {
    if (this.checkSlot(ship.slots.primary, gun)) {
      return ship.slots.primary;
    }
    if (this.checkSlot(ship.slots.secondary, gun)) {
      return ship.slots.secondary;
    }
    if (this.checkSlot(ship.slots.tertiary, gun)) {
      return ship.slots.tertiary;
    }
    throw new Error('Not a valid GUN for SHIP');
  }

  private checkSlot(slot: IShipSlot, gun: IGun): boolean {
    if (Array.isArray(slot.type)) {
      return slot.type.includes(gun.type);
    }
    return slot.type === gun.type;
  }
}
