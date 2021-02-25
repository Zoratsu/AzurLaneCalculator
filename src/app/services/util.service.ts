import { Injectable } from '@angular/core';
import { EquipmentType, IEquipment } from '@app/models/equipment';
import { IShip, IShipSlot, IShipStat, ShipStatName } from '@app/models/ship';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

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
}
