import { Injectable } from '@angular/core';
import {
  EquipmentType,
  IEquipment,
  IEquipmentTier,
} from '@app/models/equipment';
import { IEquipmentCalculation } from '@app/models/equipmentStore';
import { Nation } from '@app/models/nation';
import { IShipCalculations } from '@app/models/shipStore';
import { DatabaseService } from '@app/services/database.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GunService {
  constructor(private databaseService: DatabaseService) {}

  public getGuns(
    equipmentType: EquipmentType,
    nation?: Nation
  ): Observable<IEquipment[]> {
    return of(this.getArray(equipmentType, nation));
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
    equipment?: IEquipment;
    tier?: IEquipmentTier;
  }): Observable<IEquipmentCalculation> {
    const { equipment, tier } = active;
    if (equipment && tier) {
      const cooldown =
        equipment.absoluteCooldown + tier.rateOfFire + tier.volleyTime;
      const damage =
        tier.damage.multiplier * tier.damage.value * tier.coefficient;
      const raw = damage / cooldown;
      if (tier.ammoType) {
        const light = raw * tier.ammoType.light;
        const medium = raw * tier.ammoType.medium;
        const heavy = raw * tier.ammoType.heavy;
        return of({
          equipment,
          tier,
          damage,
          cooldown,
          raw,
          light,
          medium,
          heavy,
        });
      }
      return of({ equipment, tier, damage, cooldown, raw });
    }
    return of();
  }
}
