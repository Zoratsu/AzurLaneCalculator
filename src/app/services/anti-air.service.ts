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
export class AntiAirService {
  constructor(private databaseService: DatabaseService) {}

  public getAAGuns(
    equipmentType: EquipmentType,
    nation?: Nation
  ): Observable<IEquipment[]> {
    return of(this.getArray(equipmentType, nation));
  }

  private getArray(equipmentType: EquipmentType, nation?: Nation) {
    switch (equipmentType) {
      default:
        return [];
    }
  }

  public calculateAADps(active: {
    equipment?: IEquipment;
    tier?: IEquipmentTier;
  }): Observable<IEquipmentCalculation> {
    const { equipment, tier } = active;
    if (equipment && tier) {
      const cooldown = equipment.absoluteCooldown + tier.rateOfFire;
      const damage =
        tier.damage.multiplier * tier.damage.value * tier.coefficient;
      const raw = damage / cooldown;
      return of({ equipment, tier, damage, cooldown, raw });
    }
    return of();
  }
}
