import { Injectable } from '@angular/core';
import { EquipmentType } from '@app/models/equipment';
import { Nation } from '@app/models/nation';
import { HullType } from '@app/models/ship';
import { DatabaseService } from '@app/services/database.service';
import { Observable, of } from 'rxjs';
import { IGun, IGunCalculation, IGunTier } from '../models/gun';

@Injectable({
  providedIn: 'root',
})
export class GunService {
  constructor(private databaseService: DatabaseService) {}

  public getGuns(
    equipmentType: EquipmentType,
    nation?: Nation
  ): Observable<IGun[]> {
    let guns: IGun[];
    switch (equipmentType) {
      case EquipmentType.dd:
        guns = this.databaseService.getDestroyerGuns(nation);
        break;
      case EquipmentType.cl:
        guns = this.databaseService.getLightCruiserGuns(nation);
        break;
      case EquipmentType.ca:
        guns = this.databaseService.getHeavyCruiserGuns(nation);
        break;
      case EquipmentType.cb:
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
