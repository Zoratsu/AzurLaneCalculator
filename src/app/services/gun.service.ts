import { Injectable } from '@angular/core';
import { guns } from '@app/database/guns';
import { Observable, of } from 'rxjs';
import { IGun, IGunCalculation } from '../models/gun';

@Injectable({
  providedIn: 'root',
})
export class GunService {
  private readonly guns: IGun[] = [];

  constructor() {
    this.guns = guns;
  }

  public getGuns(className?: string): Observable<IGun[]> {
    if (className) {
      return of(this.guns.filter((gun) => gun.class.name === className));
    }
    return of([...this.guns]);
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
