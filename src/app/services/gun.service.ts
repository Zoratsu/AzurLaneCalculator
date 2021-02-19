import { Injectable } from '@angular/core';
import { Nation } from '@app/models/nation';
import { ShipHull } from '@app/models/ship';
import { DatabaseService } from '@app/services/database.service';
import { Observable, of } from 'rxjs';
import { IGun, IGunCalculation, IGunTier } from '../models/gun';

@Injectable({
  providedIn: 'root',
})
export class GunService {
  constructor(private databaseService: DatabaseService) {}

  public getGuns(shipClass: ShipHull, nation?: Nation): Observable<IGun[]> {
    let guns: IGun[];
    switch (shipClass) {
      case ShipHull.dd:
        guns = this.databaseService.getDestroyerGuns(nation);
        break;
      case ShipHull.cl:
        guns = this.databaseService.getLightCruiserGuns(nation);
        break;
      case ShipHull.ca:
        guns = this.databaseService.getHeavyCruiserGuns(nation);
        break;
      case ShipHull.cb:
        guns = this.databaseService.getLargeCruiserGuns(nation);
        break;
      default:
        guns = [];
        break;
    }
    return of(guns);
  }

  public calculateGunDps(active: {
    gun?: IGun;
    tier?: IGunTier;
  }): Observable<IGunCalculation> {
    const { gun, tier } = active;
    if (gun && tier) {
      const cooldown = gun.absoluteCooldown + tier.rateOfFire + tier.volleyTime;
      const damage =
        tier.damage.multiplier * tier.damage.value * tier.coefficient;
      const raw = damage / cooldown;
      const light = raw * tier.ammoType.light;
      const medium = raw * tier.ammoType.medium;
      const heavy = raw * tier.ammoType.heavy;
      return of({ gun, tier, damage, cooldown, raw, light, medium, heavy });
    }
    return of();
  }
}
