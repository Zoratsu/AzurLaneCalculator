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
  IShipStat,
  SlotID,
} from '@app/models/ship';
import {
  IShipActive,
  IShipCalculation,
  IShipCalculationAdvanced,
  IShipCalculations,
  IShipCalculationSlot,
  IShipEquippedSlots,
} from '@app/models/shipStore';
import { DatabaseService } from '@app/services/database.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShipService {
  constructor(private databaseService: DatabaseService) {}

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
      case HullType.bb:
        ships = this.databaseService.getBattleships(nation);
        break;
      case HullType.bc:
        ships = this.databaseService.getBattlecruisers(nation);
        break;
      case HullType.bm:
        ships = this.databaseService.getMonitors(nation);
        break;
      case HullType.ss:
        ships = this.databaseService.getSubmarines(nation);
        break;
      case HullType.cv:
        ships = this.databaseService.getCarriers(nation);
        break;
      case HullType.cvl:
        ships = this.databaseService.getLightCarriers(nation);
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
        shipSlotsEfficiencies.primaryMount,
        equipmentStats
      );
      const secondary = this.calculateSlotDPS(
        shipSlots.secondary,
        shipStat,
        shipBuff,
        shipSlotsEfficiencies.secondary,
        shipSlotsEfficiencies.secondaryMount,
        equipmentStats
      );
      const tertiary = this.calculateSlotDPS(
        shipSlots.tertiary,
        shipStat,
        shipBuff,
        shipSlotsEfficiencies.tertiary,
        shipSlotsEfficiencies.tertiaryMount,
        equipmentStats
      );
      const advanced = this.calculateAdvanced(
        primary,
        shipSlotsEfficiencies.primaryMount,
        secondary,
        shipSlotsEfficiencies.secondaryMount,
        tertiary,
        shipSlotsEfficiencies.tertiaryMount,
        shipSlots,
        shipBuff
      );
      const shipCalculation: IShipCalculation = {
        primary,
        secondary,
        tertiary,
        advanced,
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
    const finalStat = shipStat.reload * (1 + shipBuff.reload);
    const calc = Math.sqrt(200 / (finalStat + 100));
    return reload * calc;
  }

  private getFirepower(
    shipEquippedStats: IShipEquippedStats,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const base = shipStat.firepower + shipEquippedStats.firepower;
    const finalStat = base * (1 + shipBuff.firepower);
    return 1 + finalStat / 100;
  }

  private getTorpedo(
    shipEquippedStats: IShipEquippedStats,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const base = shipStat.torpedo + shipEquippedStats.torpedo;
    const finalStat = base * (1 + shipBuff.torpedo);
    return 1 + finalStat / 100;
  }

  private getAntiAir(
    shipEquippedStats: IShipEquippedStats,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const base = shipStat.antiAir + shipEquippedStats.antiAir;
    const finalStat = base * (1 + shipBuff.antiAir);
    return 1 + finalStat / 100;
  }

  private getAviationNormal(
    shipEquippedStats: IShipEquippedStats,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const base = shipStat.aviation + shipEquippedStats.aviation;
    const finalStat = base * (1 + shipBuff.aviation);
    return 1 + finalStat / 100;
  }

  private getAviationBombs(
    shipEquippedStats: IShipEquippedStats,
    shipStat: IShipStat,
    shipBuff: IShipBuff
  ): number {
    const base = shipStat.aviation + shipEquippedStats.aviation;
    const finalStat = base * 0.8 * (1 + shipBuff.aviation);
    return 1 + finalStat / 100;
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
    shipSlotMount: number,
    equipmentStats: IShipEquippedStats
  ): IShipCalculationSlot | undefined {
    if (slot) {
      switch (slot.equipment.type) {
        case EquipmentType.ff:
        case EquipmentType.db:
        case EquipmentType.tb:
        case EquipmentType.sp:
          return this.planeDPS(
            slot,
            shipStat,
            shipBuff,
            shipSlotEfficiency,
            shipSlotMount,
            equipmentStats
          );
        default:
          return this.defaultDPS(
            slot,
            shipStat,
            shipBuff,
            shipSlotEfficiency,
            shipSlotMount,
            equipmentStats
          );
      }
    }
    return undefined;
  }

  private defaultDPS(
    slot: IShipEquippedSlot,
    shipStat: IShipStat,
    shipBuff: IShipBuff,
    shipSlotEfficiency: number,
    shipSlotMount: number,
    equipmentStats: IShipEquippedStats
  ): IShipCalculationSlot | undefined {
    const { equipment, tier } = slot;
    if (tier.damage) {
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
        shipSlotEfficiency *
        shipSlotMount;
      const raw = damage / cooldown;
      if (tier.ammoType) {
        const light = raw * tier.ammoType.light;
        const medium = raw * tier.ammoType.medium;
        const heavy = raw * tier.ammoType.heavy;
        const lightDamage = damage * tier.ammoType.light;
        const mediumDamage = damage * tier.ammoType.medium;
        const heavyDamage = damage * tier.ammoType.heavy;
        return {
          damage,
          cooldown,
          raw,
          light,
          medium,
          heavy,
          lightDamage,
          mediumDamage,
          heavyDamage,
        };
      }
      return { damage, cooldown, raw };
    }
    return undefined;
  }

  private planeDPS(
    slot: IShipEquippedSlot,
    shipStat: IShipStat,
    shipBuff: IShipBuff,
    shipSlotEfficiency: number,
    shipSlotMount: number,
    equipmentStats: IShipEquippedStats
  ): IShipCalculationSlot | undefined {
    const { equipment, tier } = slot;
    const cooldown =
      this.getPureCD(tier, shipStat, shipBuff) * 2.2 +
      equipment.absoluteCooldown;
    if (tier.damageArray && tier.ammoTypeArray) {
      const damage = tier.damageArray
        .map((item) => {
          return (
            item.multiplier *
            item.value *
            tier.coefficient *
            (1 + shipBuff.damage) *
            this.getRelevantStat(slot, equipmentStats, shipStat, shipBuff) *
            shipSlotEfficiency *
            shipSlotMount
          );
        })
        .reduce((prev, cur) => prev + cur);
      const raw = damage / cooldown;
      const lightDamage = tier.damageArray
        .map((item, index) => {
          return (
            item.multiplier *
            item.value *
            tier.coefficient *
            (1 + shipBuff.damage) *
            this.getRelevantStat(slot, equipmentStats, shipStat, shipBuff) *
            shipSlotEfficiency *
            shipSlotMount *
            (tier.ammoTypeArray ? tier.ammoTypeArray[index].light : 1)
          );
        })
        .reduce((prev, cur) => prev + cur);
      const mediumDamage = tier.damageArray
        .map((item, index) => {
          return (
            item.multiplier *
            item.value *
            tier.coefficient *
            (1 + shipBuff.damage) *
            this.getRelevantStat(slot, equipmentStats, shipStat, shipBuff) *
            shipSlotEfficiency *
            shipSlotMount *
            (tier.ammoTypeArray ? tier.ammoTypeArray[index].medium : 1)
          );
        })
        .reduce((prev, cur) => prev + cur);
      const heavyDamage = tier.damageArray
        .map((item, index) => {
          return (
            item.multiplier *
            item.value *
            tier.coefficient *
            (1 + shipBuff.damage) *
            this.getRelevantStat(slot, equipmentStats, shipStat, shipBuff) *
            shipSlotEfficiency *
            shipSlotMount *
            (tier.ammoTypeArray ? tier.ammoTypeArray[index].heavy : 1)
          );
        })
        .reduce((prev, cur) => prev + cur);
      const light = lightDamage / cooldown;
      const medium = mediumDamage / cooldown;
      const heavy = heavyDamage / cooldown;
      return {
        damage,
        cooldown,
        raw,
        light,
        medium,
        heavy,
        lightDamage,
        mediumDamage,
        heavyDamage,
      };
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
      case EquipmentType.tb:
        return this.getAviationNormal(shipEquippedStats, shipStat, shipBuff);
      case EquipmentType.ff:
      case EquipmentType.db:
      case EquipmentType.sp:
        return this.getAviationBombs(shipEquippedStats, shipStat, shipBuff);
    }
    return 1;
  }

  private getEquipmentStats(shipSlots: IShipEquippedSlots): IShipEquippedStats {
    const antiAir = this.getEquipmentStat(shipSlots, 'antiAir');
    const firepower = this.getEquipmentStat(shipSlots, 'firepower');
    const torpedo = this.getEquipmentStat(shipSlots, 'torpedo');
    const aviation = this.getEquipmentStat(shipSlots, 'aviation');
    return { antiAir, aviation, firepower, torpedo };
  }

  private getEquipmentStat(
    shipSlots: IShipEquippedSlots,
    stat: 'antiAir' | 'firepower' | 'torpedo' | 'aviation'
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
    stat: 'antiAir' | 'firepower' | 'torpedo' | 'aviation'
  ): number {
    switch (stat) {
      case 'antiAir':
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

  private calculateAdvanced(
    primary: IShipCalculationSlot | undefined,
    primaryMount: number,
    secondary: IShipCalculationSlot | undefined,
    secondaryMount: number,
    tertiary: IShipCalculationSlot | undefined,
    tertiaryMount: number,
    shipSlots: IShipEquippedSlots,
    shipBuff: IShipBuff
  ): IShipCalculationAdvanced | undefined {
    const antiAir = this.calculateAdvancedAntiAir(
      shipSlots,
      primary,
      secondary,
      tertiary
    );
    const aviation = this.calculateAdvancedAviation(
      shipSlots,
      primary,
      primaryMount,
      secondary,
      secondaryMount,
      tertiary,
      tertiaryMount
    );
    const aviationTiming = this.calculateAviationTiming(aviation, shipBuff);
    const shellingTiming = this.calculateShellingTiming(
      shipSlots,
      primary,
      shipBuff
    );
    return { antiAir, aviation, aviationTiming, shellingTiming };
  }

  private calculateAdvancedAntiAir(
    shipSlots: IShipEquippedSlots,
    primary: IShipCalculationSlot | undefined,
    secondary: IShipCalculationSlot | undefined,
    tertiary: IShipCalculationSlot | undefined
  ): IShipCalculationSlot | undefined {
    if (
      shipSlots.primary?.equipment.type === EquipmentType.aa ||
      shipSlots.secondary?.equipment.type === EquipmentType.aa ||
      shipSlots.tertiary?.equipment.type === EquipmentType.aa
    ) {
      let damage = 0;
      let reload = 0;
      let counter = 0;
      if (shipSlots.primary?.equipment.type === EquipmentType.aa) {
        counter++;
        damage += primary?.damage || 0;
        reload += primary?.cooldown || 0;
      }
      if (shipSlots.secondary?.equipment.type === EquipmentType.aa) {
        counter++;
        damage += secondary?.damage || 0;
        reload += secondary?.cooldown || 0;
      }
      if (shipSlots.tertiary?.equipment.type === EquipmentType.aa) {
        counter++;
        damage += tertiary?.damage || 0;
        reload += tertiary?.cooldown || 0;
      }
      if (counter > 1) {
        const cooldown = reload / counter;
        const raw = damage / cooldown;
        return { damage, cooldown, raw };
      }
    }
    return undefined;
  }

  private calculateAdvancedAviation(
    shipSlots: IShipEquippedSlots,
    primary: IShipCalculationSlot | undefined,
    primaryMount: number,
    secondary: IShipCalculationSlot | undefined,
    secondaryMount: number,
    tertiary: IShipCalculationSlot | undefined,
    tertiaryMount: number
  ): IShipCalculationSlot | undefined {
    if (
      this.isPlane(shipSlots.primary?.equipment.type) ||
      this.isPlane(shipSlots.secondary?.equipment.type) ||
      this.isPlane(shipSlots.tertiary?.equipment.type)
    ) {
      let cooldown = 0;
      let damage = 0;
      let lightDamage = 0;
      let mediumDamage = 0;
      let heavyDamage = 0;
      let flag1 = false;
      let flag2 = false;
      let flag3 = false;
      if (this.isPlane(shipSlots.primary?.equipment.type)) {
        if (primary) {
          cooldown += primary.cooldown * primaryMount;
          damage += primary.damage;
          lightDamage += primary.lightDamage || 0;
          mediumDamage += primary.mediumDamage || 0;
          heavyDamage += primary.heavyDamage || 0;
          flag1 = true;
        }
      }
      if (this.isPlane(shipSlots.secondary?.equipment.type)) {
        if (secondary) {
          cooldown += secondary.cooldown * secondaryMount;
          damage += secondary.damage;
          lightDamage += secondary.lightDamage || 0;
          mediumDamage += secondary.mediumDamage || 0;
          heavyDamage += secondary.heavyDamage || 0;
          flag2 = true;
        }
      }
      if (this.isPlane(shipSlots.tertiary?.equipment.type)) {
        if (tertiary) {
          cooldown += tertiary.cooldown * tertiaryMount;
          damage += tertiary.damage;
          lightDamage += tertiary.lightDamage || 0;
          mediumDamage += tertiary.mediumDamage || 0;
          heavyDamage += tertiary.heavyDamage || 0;
          flag3 = true;
        }
      }
      cooldown /=
        (flag1 ? primaryMount : 0) +
        (flag2 ? secondaryMount : 0) +
        (flag3 ? tertiaryMount : 0);
      return {
        cooldown,
        raw: damage / cooldown,
        damage,
        lightDamage,
        mediumDamage,
        heavyDamage,
        light: lightDamage / cooldown,
        medium: mediumDamage / cooldown,
        heavy: heavyDamage / cooldown,
      };
    }
    return undefined;
  }

  private isPlane(equipmentType?: EquipmentType): boolean {
    if (equipmentType) {
      return (
        equipmentType === EquipmentType.ff ||
        equipmentType === EquipmentType.db ||
        equipmentType === EquipmentType.tb ||
        equipmentType === EquipmentType.sp
      );
    } else {
      return false;
    }
  }

  private calculateAviationTiming(
    aviation: IShipCalculationSlot | undefined,
    shipBuff: IShipBuff
  ): number[] | undefined {
    if (aviation) {
      return this.calculateTiming(
        aviation.cooldown,
        shipBuff.initialStrike,
        shipBuff.allStrike
      );
    }
    return undefined;
  }

  private calculateShellingTiming(
    shipSlots: IShipEquippedSlots,
    primary: IShipCalculationSlot | undefined,
    shipBuff: IShipBuff
  ): number[] | undefined {
    if (shipSlots.primary && primary) {
      if (shipSlots.primary.equipment.type === EquipmentType.bb) {
        return this.calculateTiming(
          primary.cooldown,
          shipBuff.initialStrike,
          shipBuff.allStrike
        );
      }
    }
    return undefined;
  }

  private calculateTiming(
    cooldown: number,
    initialStrike: number,
    allStrike: number
  ): number[] {
    const array: number[] = [];
    let lastValue = 1.5;
    for (let i = 0; i < 10; i++) {
      if (i === 0) {
        lastValue += cooldown * (1 - initialStrike - allStrike);
      } else {
        lastValue += cooldown * (1 - allStrike);
      }
      array.push(lastValue);
    }
    return array;
  }
}
