import { Injectable } from '@angular/core';
import { EquipmentType } from '@app/models/equipment';
import {
  IEquipmentActive,
  IEquipmentCalculation,
} from '@app/models/equipmentStore';
import { Nation } from '@app/models/nation';
import { GunService } from '@app/services/gun.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(private gunService: GunService) {}

  public calculateDPS({
    equipment,
    tier,
  }: IEquipmentActive): Observable<IEquipmentCalculation> {
    if (equipment && tier) {
      switch (equipment.type) {
        case EquipmentType.dd:
        case EquipmentType.cl:
        case EquipmentType.ca:
        case EquipmentType.cb:
        case EquipmentType.bb:
          return this.gunService.calculateGunDps({ equipment, tier });
      }
      throw new Error('Not a valid EquipmentType');
    }
    throw new Error('Not a valid IEquipmentActive');
  }

  public getEquipment(equipmentType: EquipmentType, nation?: Nation) {
    switch (equipmentType) {
      case EquipmentType.dd:
      case EquipmentType.cl:
      case EquipmentType.ca:
      case EquipmentType.cb:
      case EquipmentType.bb:
        return this.gunService.getGuns(equipmentType, nation);
    }
    throw new Error('Not a valid EquipmentType');
  }
}
