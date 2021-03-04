import { Injectable } from '@angular/core';
import { IEquipment, IEquipmentTier } from '@app/models/equipment';
import { IEquipmentCalculation } from '@app/models/equipmentStore';
import { Nation } from '@app/models/nation';
import { DatabaseService } from '@app/services/database.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AntiAirService {
  constructor(private databaseService: DatabaseService) {}

  public getAntiAirGuns(nation?: Nation): Observable<IEquipment[]> {
    return of(this.getArray(nation));
  }

  private getArray(nation?: Nation): IEquipment[] {
    return this.databaseService.getAntiAirGuns(nation);
  }

  public calculateAADps(active: {
    equipment?: IEquipment;
    tier?: IEquipmentTier;
  }): Observable<IEquipmentCalculation> {
    const { equipment, tier } = active;
    if (equipment && tier && tier.damage) {
      const cooldown = equipment.absoluteCooldown + tier.rateOfFire;
      const damage =
        tier.damage.multiplier * tier.damage.value * tier.coefficient;
      const raw = damage / cooldown;
      return of({ equipment, tier, damage, cooldown, raw });
    }
    return of();
  }
}
