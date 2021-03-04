import { Injectable } from '@angular/core';
import {
  EquipmentType,
  IEquipment,
  IEquipmentTier,
} from '@app/models/equipment';
import { IEquipmentCalculation } from '@app/models/equipmentStore';
import { Nation } from '@app/models/nation';
import { DatabaseService } from '@app/services/database.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaneService {
  constructor(private databaseService: DatabaseService) {}

  public getPlanes(
    equipmentType: EquipmentType,
    nation?: Nation
  ): Observable<IEquipment[]> {
    return of(this.getArray(equipmentType, nation));
  }

  private getArray(
    equipmentType: EquipmentType,
    nation?: Nation
  ): IEquipment[] {
    switch (equipmentType) {
      case EquipmentType.ff:
        return this.databaseService.getFighters(nation);
      case EquipmentType.db:
        return this.databaseService.getDiveBombers(nation);
      case EquipmentType.tb:
        return this.databaseService.getTorpedoBombers(nation);
      case EquipmentType.sp:
        return this.databaseService.getSeaplanes(nation);
      default:
        return [];
    }
  }

  public calculatePlaneDps(active: {
    equipment?: IEquipment;
    tier?: IEquipmentTier;
  }): Observable<IEquipmentCalculation> {
    const { equipment, tier } = active;
    if (equipment && tier && tier.damageArray && tier.ammoTypeArray) {
      const cooldown = equipment.absoluteCooldown + tier.rateOfFire * 2.2;
      const damage = tier.damageArray
        .map((item) => {
          return item.multiplier * item.value * tier.coefficient;
        })
        .reduce((prev, cur) => prev + cur);
      const raw = damage / cooldown;
      const lightDamage = tier.damageArray
        .map((item, index) => {
          return (
            item.multiplier *
            item.value *
            tier.coefficient *
            (tier.ammoTypeArray ? tier.ammoTypeArray[index].light : 1)
          );
        })
        .reduce((prev, cur) => prev + cur);
      const light = lightDamage / cooldown;
      const mediumDamage = tier.damageArray
        .map((item, index) => {
          return (
            item.multiplier *
            item.value *
            tier.coefficient *
            (tier.ammoTypeArray ? tier.ammoTypeArray[index].medium : 1)
          );
        })
        .reduce((prev, cur) => prev + cur);
      const medium = mediumDamage / cooldown;
      const heavyDamage = tier.damageArray
        .map((item, index) => {
          return (
            item.multiplier *
            item.value *
            tier.coefficient *
            (tier.ammoTypeArray ? tier.ammoTypeArray[index].heavy : 1)
          );
        })
        .reduce((prev, cur) => prev + cur);
      const heavy = mediumDamage / cooldown;
      return of({
        equipment,
        tier,
        damage,
        cooldown,
        raw,
        light,
        lightDamage,
        medium,
        mediumDamage,
        heavy,
        heavyDamage,
      });
    }
    return of();
  }
}
