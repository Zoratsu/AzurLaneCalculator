import { Injectable } from '@angular/core';
import { EquipmentType, IEquipment } from '@app/models/equipment';
import { Nation } from '@app/models/nation';
import { IShip, IShipSlot, IShipStat, ShipStatName } from '@app/models/ship';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public nationList: Nation[] = [];

  constructor() {
    this.nationList = Object.values(Nation).sort((a, b) => (a > b ? 1 : -1));
  }

  public getSlot(
    ship: IShip,
    equipment: IEquipment,
    shipStat: IShipStat
  ): IShipSlot {
    if (this.checkSlot(ship.slots.primary, equipment, shipStat)) {
      return ship.slots.primary;
    }
    if (this.checkSlot(ship.slots.secondary, equipment, shipStat)) {
      return ship.slots.secondary;
    }
    if (this.checkSlot(ship.slots.tertiary, equipment, shipStat)) {
      return ship.slots.tertiary;
    }
    throw new Error('Not a valid Equipment for SHIP');
  }

  public checkSlot(
    slot: IShipSlot,
    equipment: IEquipment,
    shipStat: IShipStat
  ): boolean {
    const type = this.getType(slot, shipStat);
    if (Array.isArray(type)) {
      return type.includes(equipment.type);
    }
    return type === equipment.type;
  }

  public getType(
    slot: IShipSlot,
    shipStat: IShipStat
  ): EquipmentType | EquipmentType[] {
    switch (shipStat.name) {
      case ShipStatName.lvl100:
      case ShipStatName.lvl120:
        return slot.maxType;
      case ShipStatName.lvl100Retro:
      case ShipStatName.lvl120Retro:
        return slot.retroType || slot.maxType;
      default:
        return slot.minType;
    }
  }

  public getEfficiency(slot: IShipSlot, shipStat: IShipStat): number {
    switch (shipStat.name) {
      case ShipStatName.lvl100:
      case ShipStatName.lvl120:
        return slot.maxEfficiency;
      case ShipStatName.lvl100Retro:
      case ShipStatName.lvl120Retro:
        return slot.kaiEfficiency || slot.maxEfficiency;
      default:
        return slot.minEfficiency;
    }
  }

  public getSlotEfficiency(
    ship: IShip,
    equipment: IEquipment,
    shipStat: IShipStat
  ): number {
    const slot = this.getSlot(ship, equipment, shipStat);
    return this.getEfficiency(slot, shipStat);
  }

  public getPercentage(value?: number): number {
    if (value) {
      return Math.round(value * 100 * 100) / 100;
    } else {
      return 0;
    }
  }

  public getValue(value?: number): number {
    if (value) {
      return Math.round(value * 100) / 100;
    } else {
      return 0;
    }
  }

  public reversePercentage(value?: string): number {
    if (value) {
      return Number(value) / 100;
    } else {
      return 0;
    }
  }

  public reverseValue(value?: string): number {
    if (value) {
      return Number(value);
    } else {
      return 0;
    }
  }
  public loadNationList(filter?: string): Nation[] {
    if (filter && filter.trim().length > 0) {
      return this.nationList
        .filter((nation) => nation.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => (a > b ? 1 : -1));
    } else {
      return this.nationList.sort((a, b) => (a > b ? 1 : -1));
    }
  }
}
