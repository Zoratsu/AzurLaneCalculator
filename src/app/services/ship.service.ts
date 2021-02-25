import { Injectable } from '@angular/core';
import {
  EquipmentType,
  IEquipment,
  IEquipmentCalculation,
  IEquipmentTier,
} from '@app/models/equipment';
import { Nation } from '@app/models/nation';
import {
  HullType,
  IShip,
  IShipCalculation,
  IShipSlot,
  IShipStat,
  ShipStatName,
  SlotID,
} from '@app/models/ship';
import { DatabaseService } from '@app/services/database.service';
import { UtilService } from '@app/services/util.service';
import { IEquipmentActive } from '@app/store/reducers/equipment.reducer';
import { IShipEquippedSlots } from '@app/store/reducers/ship.reducer';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  constructor(
    private databaseService: DatabaseService,
    private equipmentService: UtilService
  ) {}

  public getShips(shipClass: HullType, nation?: Nation): Observable<IShip[]> {
    let ships: IShip[];
    switch (shipClass) {
      case HullType.dd:
        ships = this.databaseService.getDestroyers(nation);
        break;
      case HullType.cl:
        ships = this.databaseService.getLightCruisers(nation);
        break;
      case HullType.ca:
        ships = this.databaseService.getHeavyCruisers(nation);
        break;
      case HullType.cb:
        ships = this.databaseService.getLargeCruisers(nation);
        break;
      default:
        ships = [];
        break;
    }
    return of(ships);
  }

  public calculateShipDps(
    gunCalculation?: IEquipmentCalculation,
    ship?: IShip,
    shipStat?: IShipStat
  ): Observable<IShipCalculation> {
    if (gunCalculation && ship && shipStat) {
      const { equipment, tier } = gunCalculation;
      const cooldown =
        this.getPureCD(tier, ship, shipStat) +
        tier.volleyTime +
        equipment.absoluteCooldown;
      const damage =
        gunCalculation.damage *
        1 /*+ ship.buff.damage*/ *
        this.getFirepower(tier, ship, shipStat) *
        this.equipmentService.getSlotEfficiency(ship, equipment, shipStat);
      const raw = damage / cooldown;
      if (tier.ammoType) {
        const light = raw * tier.ammoType.light;
        const medium = raw * tier.ammoType.medium;
        const heavy = raw * tier.ammoType.heavy;
        return of({
          gun: equipment,
          tier,
          ship,
          shipStat,
          damage,
          cooldown,
          raw,
          light,
          medium,
          heavy,
        });
      }
      return of({
        gun: equipment,
        tier,
        ship,
        shipStat,
        damage,
        cooldown,
        raw,
      });
    }
    return of();
  }

  private getPureCD(
    tier: IEquipmentTier,
    ship: IShip,
    shipStat: IShipStat
  ): number {
    const reload = tier.rateOfFire;
    const calc = Math.sqrt(
      200 / (shipStat.reload * 1 /*+ ship.buff.reload*/ + 100)
    );
    return reload * calc;
  }

  private getFirepower(
    tier: IEquipmentTier,
    ship: IShip,
    shipStat: IShipStat
  ): number {
    const baseFP = shipStat.firepower + tier.firepower;
    return (baseFP + baseFP) /** ship.buff.firepower*/ / 100;
  }

  public createEquippedSlots(
    { equipment, tier }: IEquipmentActive,
    slot: SlotID
  ): Observable<IShipEquippedSlots> {
    switch (slot) {
      case SlotID.primary:
        return of({ primary: { equipment, tier } });
      case SlotID.secondary:
        return of({ secondary: { equipment, tier } });
      case SlotID.tertiary:
        return of({ tertiary: { equipment, tier } });
    }
    return of({});
  }
}
