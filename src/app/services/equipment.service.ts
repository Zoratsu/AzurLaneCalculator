import { Injectable } from '@angular/core';
import { EquipmentType, IEquipment } from '@app/models/equipment';
import {
  IEquipmentActive,
  IEquipmentCalculation,
} from '@app/models/equipmentStore';
import { Nation } from '@app/models/nation';
import { AntiAirService } from '@app/services/anti-air.service';
import { GunService } from '@app/services/gun.service';
import { PlaneService } from '@app/services/plane.service';
import { TorpedoService } from '@app/services/torpedo.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  constructor(
    private gunService: GunService,
    private torpedoService: TorpedoService,
    private antiAirService: AntiAirService,
    private planeService: PlaneService
  ) {}

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
        case EquipmentType.torpSurf:
        case EquipmentType.torpSubs:
          return this.torpedoService.calculateTorpedoDps({ equipment, tier });
        case EquipmentType.aa:
          return this.antiAirService.calculateAADps({ equipment, tier });
        case EquipmentType.ff:
        case EquipmentType.db:
        case EquipmentType.tb:
        case EquipmentType.sp:
          return this.planeService.calculatePlaneDps({ equipment, tier });
      }
      throw new Error('Not a valid EquipmentType');
    }
    throw new Error('Not a valid IEquipmentActive');
  }

  public getEquipment(
    equipmentType?: EquipmentType,
    nation?: Nation
  ): Observable<IEquipment[]> {
    switch (equipmentType) {
      case EquipmentType.dd:
      case EquipmentType.cl:
      case EquipmentType.ca:
      case EquipmentType.cb:
      case EquipmentType.bb:
        return this.gunService.getGuns(equipmentType, nation);
      case EquipmentType.torpSurf:
      case EquipmentType.torpSubs:
        return this.torpedoService.getTorpedoes(equipmentType, nation);
      case EquipmentType.aa:
        return this.antiAirService.getAntiAirGuns(nation);
      case EquipmentType.ff:
      case EquipmentType.db:
      case EquipmentType.tb:
      case EquipmentType.sp:
        return this.planeService.getPlanes(equipmentType, nation);
    }
    throw new Error('Not a valid EquipmentType');
  }
}
