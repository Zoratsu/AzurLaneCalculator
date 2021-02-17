import { Injectable } from '@angular/core';
import { ShipClass } from '@app/models/ship';
import { DatabaseService } from '@app/services/database.service';
import { Observable, of } from 'rxjs';
import { IGun, IGunCalculation } from '../models/gun';

@Injectable({
  providedIn: 'root',
})
export class GunService {
  constructor(private databaseService: DatabaseService) {}

  public getGuns(shipClass: ShipClass, gunName?: string): Observable<IGun[]> {
    let guns: IGun[];
    switch (shipClass) {
      case ShipClass.dd:
        guns = this.databaseService.getDestroyerGuns(gunName);
        break;
      case ShipClass.cl:
        guns = this.databaseService.getLightCruiserGuns(gunName);
        break;
      case ShipClass.ca:
        guns = this.databaseService.getHeavyCruiserGuns(gunName);
        break;
      case ShipClass.cb:
        guns = this.databaseService
          .getLargeCruiserGuns(gunName)
          .concat(
            this.databaseService
              .getHeavyCruiserGuns(gunName)
              .filter((gun) => gun.name !== 'Manual')
          );
        break;
      default:
        guns = [];
        break;
    }
    return of(guns);
  }

  public calculateGunDps(gun?: IGun): Observable<IGunCalculation> {
    if (gun) {
      const cooldown = gun.class.absoluteCooldown + gun.reload + gun.volleyTime;
      const damage = gun.bullet.number * gun.bullet.damage * gun.coefficient;
      const raw = damage / cooldown;
      const light = raw * gun.bullet.ammo.light;
      const medium = raw * gun.bullet.ammo.medium;
      const heavy = raw * gun.bullet.ammo.heavy;
      return of({ gun, damage, cooldown, raw, light, medium, heavy });
    }
    return of();
  }
}
