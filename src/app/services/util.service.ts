import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipmentType } from '@app/models/equipment';
import { Nation } from '@app/models/nation';
import { IShip, IShipSlot, IShipStat, ShipStatName } from '@app/models/ship';
import { IShipSlotsEfficiencies } from '@app/models/shipStore';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public nationList: Nation[] = [];

  constructor(private snackBar: MatSnackBar) {
    this.nationList = Object.values(Nation).sort((a, b) => (a > b ? 1 : -1));
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

  public getSlotsEfficiencies(
    ship: IShip,
    shipStat: IShipStat
  ): IShipSlotsEfficiencies {
    return {
      primary: this.getEfficiency(ship.slots.primary, shipStat),
      primaryMount: 1,
      secondary: this.getEfficiency(ship.slots.secondary, shipStat),
      secondaryMount: 1,
      tertiary: this.getEfficiency(ship.slots.tertiary, shipStat),
      tertiaryMount: 1,
    };
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

  public createSnack(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
