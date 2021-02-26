import { Injectable } from '@angular/core';
import { EquipmentType, IEquipmentTier } from '@app/models/equipment';
import { IEquipmentActive } from '@app/models/equipmentStore';
import { Nation } from '@app/models/nation';
import {
  HullType,
  IShip,
  IShipBuff,
  IShipEquippedSlot,
  IShipEquippedStats,
  IShipSlot,
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
      const equipmentStats = this.getEquipmentStats(shipSlots);
      const primary = this.calculateSlotDPS(
        shipSlots.primary,
        shipStat,
        shipBuff,
        shipSlotsEfficiencies.primary,
        equipmentStats
      );
      const secondary = this.calculateSlotDPS(
        shipSlots.secondary,
        shipStat,
        shipBuff,
        shipSlotsEfficiencies.secondary,
        equipmentStats
      );
      const tertiary = this.calculateSlotDPS(
        shipSlots.tertiary,
        shipStat,
        shipBuff,
        shipSlotsEfficiencies.tertiary,
        equipmentStats
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
    shipEquippedStats: IShipEquippedStats,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const base = shipStat.firepower + shipEquippedStats.firepower;
    return (base + base * shipBuff.firepower) / 100;
  }

  private getTorpedo(
    shipEquippedStats: IShipEquippedStats,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const base = shipStat.torpedo + shipEquippedStats.torpedo;
    return (base + base * shipBuff.torpedo) / 100;
  }

  private getAntiAir(
    shipEquippedStats: IShipEquippedStats,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const base = shipStat.antiair + shipEquippedStats.antiAir;
    return (base + base * shipBuff.antiair) / 100;
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
    shipSlotEfficiency: number,
    equipmentStats: IShipEquippedStats
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
        this.getRelevantStat(slot, equipmentStats, shipStat, shipBuff) *
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
    shipEquippedStats: IShipEquippedStats,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    switch (slot.equipment.type) {
      case EquipmentType.dd:
      case EquipmentType.cl:
      case EquipmentType.ca:
      case EquipmentType.cb:
      case EquipmentType.bb:
        return this.getFirepower(shipEquippedStats, shipStat, shipBuff);
      case EquipmentType.torpSurf:
      case EquipmentType.torpSubs:
        return this.getTorpedo(shipEquippedStats, shipStat, shipBuff);
      case EquipmentType.aa:
        return this.getAntiAir(shipEquippedStats, shipStat, shipBuff);
    }
    return 0;
  }

  private getEquipmentStats(shipSlots: IShipEquippedSlots): IShipEquippedStats {
    const antiair = this.getEquipmentStat(shipSlots, 'antiair');
    const firepower = this.getEquipmentStat(shipSlots, 'firepower');
    const torpedo = this.getEquipmentStat(shipSlots, 'torpedo');
    const aviation = this.getEquipmentStat(shipSlots, 'aviation');
    return { antiAir: antiair, aviation, firepower, torpedo };
  }

  private getEquipmentStat(
    shipSlots: IShipEquippedSlots,
    stat: 'antiair' | 'firepower' | 'torpedo' | 'aviation'
  ): number {
    let value = 0;
    if (shipSlots.primary) {
      value += this.getEquipmentStatSlot(shipSlots.primary, stat);
    }
    if (shipSlots.secondary) {
      value += this.getEquipmentStatSlot(shipSlots.secondary, stat);
    }
    if (shipSlots.tertiary) {
      value += this.getEquipmentStatSlot(shipSlots.tertiary, stat);
    }
    return value;
  }
  private getEquipmentStatSlot(
    slot: IShipEquippedSlot,
    stat: 'antiair' | 'firepower' | 'torpedo' | 'aviation'
  ) {
    switch (stat) {
      case 'antiair':
        return slot.tier.antiAir;
      case 'firepower':
        return slot.tier.firepower;
      case 'torpedo':
        return slot.tier.torpedo;
      case 'aviation':
        return slot.tier.aviation;
      default:
        return 0;
    }
  }
}
