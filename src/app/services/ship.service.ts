import { Injectable } from '@angular/core';
import { EquipmentType, IEquipmentTier } from '@app/models/equipment';
import { IEquipmentActive } from '@app/models/equipmentStore';
import { Nation } from '@app/models/nation';
import {
  HullType,
  IShip,
  IShipBuff,
  IShipEquippedSlot,
  IShipStat,
  SlotID,
} from '@app/models/ship';
import {
  IShipActive,
  IShipCalculation,
  IShipCalculations,
  IShipCalculationSlot,
  IShipEquippedSlots,
} from '@app/models/shipStore';
import { DatabaseService } from '@app/services/database.service';
import { EquipmentService } from '@app/services/equipment.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  constructor(
    private databaseService: DatabaseService,
    private equipmentService: EquipmentService
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

  public calculateShipDps({
    ship,
    shipSlots,
    shipStat,
    shipBuff,
    shipSlotsEfficiencies,
  }: IShipActive): Observable<IShipCalculations> {
    if (ship && shipStat && shipBuff && shipSlots && shipSlotsEfficiencies) {
      const primary = this.calculateSlotDPS(
        shipSlots.primary,
        shipStat,
        shipBuff,
        shipSlotsEfficiencies.primary
      );
      const secondary = this.calculateSlotDPS(
        shipSlots.secondary,
        shipStat,
        shipBuff,
        shipSlotsEfficiencies.secondary
      );
      const tertiary = this.calculateSlotDPS(
        shipSlots.tertiary,
        shipStat,
        shipBuff,
        shipSlotsEfficiencies.tertiary
      );
      const shipCalculation: IShipCalculation = {
        primary,
        secondary,
        tertiary,
      };
      return of({
        ship,
        shipStat,
        shipBuff,
        shipSlots,
        shipCalculation,
      });
    }
    throw new SyntaxError('Parameters are needed');
  }

  private getPureCD(
    tier: IEquipmentTier,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const reload = tier.rateOfFire;
    const calc = Math.sqrt(
      200 / (shipStat.reload * (1 + shipBuff.reload) + 100)
    );
    return reload * calc;
  }

  private getFirepower(
    tier: IEquipmentTier,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const baseFP = shipStat.firepower + tier.firepower;
    return (baseFP + baseFP * shipBuff.firepower) / 100;
  }

  private getTorpedo(
    tier: IEquipmentTier,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const baseTorpedo = shipStat.torpedo + tier.torpedo;
    return (baseTorpedo + baseTorpedo * shipBuff.torpedo) / 100;
  }

  public createEquippedSlots(
    { equipment, tier }: IEquipmentActive,
    slot: SlotID
  ): Observable<IShipEquippedSlots> {
    if (equipment && tier) {
      switch (slot) {
        case SlotID.primary:
          return of({ primary: { equipment, tier } });
        case SlotID.secondary:
          return of({ secondary: { equipment, tier } });
        case SlotID.tertiary:
          return of({ tertiary: { equipment, tier } });
      }
    }
    return of({});
  }

  private calculateSlotDPS(
    slot: IShipEquippedSlot | undefined,
    shipStat: IShipStat,
    shipBuff: IShipBuff,
    shipSlotEfficiency: number
  ): IShipCalculationSlot | undefined {
    if (slot) {
      const { equipment, tier } = slot;
      const cooldown =
        this.getPureCD(tier, shipStat, shipBuff) +
        tier.volleyTime +
        equipment.absoluteCooldown;
      const damage =
        tier.damage.multiplier *
        tier.damage.value *
        tier.coefficient *
        (1 + shipBuff.damage) *
        this.getRelevantStat(slot, tier, shipStat, shipBuff) *
        shipSlotEfficiency;
      const raw = damage / cooldown;
      if (tier.ammoType) {
        const light = raw * tier.ammoType.light;
        const medium = raw * tier.ammoType.medium;
        const heavy = raw * tier.ammoType.heavy;
        return { damage, cooldown, raw, light, medium, heavy };
      }
      return { damage, cooldown, raw };
    }
    return undefined;
  }

  private getRelevantStat(
    slot: IShipEquippedSlot,
    tier: IEquipmentTier,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    switch (slot.equipment.type) {
      case EquipmentType.dd:
      case EquipmentType.cl:
      case EquipmentType.ca:
      case EquipmentType.cb:
      case EquipmentType.bb:
        return this.getFirepower(tier, shipStat, shipBuff);
      case EquipmentType.torpSurf:
      case EquipmentType.torpSubs:
        return this.getTorpedo(tier, shipStat, shipBuff);
    }
    return 0;
  }
}
