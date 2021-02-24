import { Injectable } from '@angular/core';
import { EquipmentType } from '@app/models/equipment';
import { Nation } from '@app/models/nation';
import { DatabaseService } from '@app/services/database.service';
import { Observable, of } from 'rxjs';
import { IGun, IGunCalculation, IGunTier } from '../models/gun';

@Injectable({
  providedIn: 'root',
})
export class GunService {
  constructor(private databaseService: DatabaseService) {}

  public getGuns(
    equipmentType: EquipmentType | EquipmentType[],
    nation?: Nation
  ): Observable<IGun[]> {
    let guns: IGun[] = [];
    if (Array.isArray(equipmentType)) {
      for (let type of equipmentType) {
        guns = guns.concat(this.getArray(type, nation));
      }
    } else {
      guns = this.getArray(equipmentType, nation);
    }
    return of(guns);
  }

  private getArray(equipmentType: EquipmentType, nation?: Nation) {
    switch (equipmentType) {
      case EquipmentType.dd:
        return this.databaseService.getDestroyerGuns(nation);
      case EquipmentType.cl:
        return this.databaseService.getLightCruiserGuns(nation);
      case EquipmentType.ca:
        return this.databaseService.getHeavyCruiserGuns(nation);
      case EquipmentType.cb:
        return this.databaseService.getLargeCruiserGuns(nation);
      default:
        return [];
    }
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
