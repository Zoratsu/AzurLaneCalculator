import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IGun } from '@app/models/gun';
import {
  IShip,
  IShipSlot,
  IShipSlots,
  IShipStat,
  ShipStatName,
} from '@app/models/ship';
import { AppState } from '@app/store';
import { selectShipActive } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-item',
  templateUrl: './ship-item.component.html',
  styleUrls: ['./ship-item.component.scss'],
})
export class ShipItemComponent implements OnInit, OnDestroy {
  public ship?: IShip;
  public shipStat?: IShipStat;
  public shipForm: FormGroup;

  private ngUnsubscribe = new Subject();
  private gun?: IGun;

  public constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.shipForm = this.buildForm();
  }

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSubmit(): void {
    if (this.ship && this.shipStat) {
      /*const form = this.shipForm.getRawValue();
      let ship: IShip = {
        ...this.ship,
        buff: {
          firepower: this.reversePercentage(form.firepowerBuff),
          reload: this.reversePercentage(form.reloadBuff),
          damage: this.reversePercentage(form.damageBuff),
        },
        slots: this.setSlots(this.reversePercentage(form.efficiency)),
      };
      this.store.dispatch(ShipActions.SetActiveShip({ ship }));
      let shipStat: IShipStat = {
        ...this.shipStat,
        firepower: this.reverseValue(form.firepower),
        reload: this.reverseValue(form.reload),
      };
      this.store.dispatch(ShipActions.SetActiveShipStat({ shipStat }));*/
    }
    //this.store.dispatch(ShipActions.ProcessActive());
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      primary: this.fb.control(100),
      secondary: this.fb.control(100),
      tertiary: this.fb.control(100),
      antiair: this.fb.control(100),
      reload: this.fb.control(100),
      firepower: this.fb.control(100),
      torpedo: this.fb.control(100),
      aviation: this.fb.control(100),
      damageBuff: this.fb.control(100),
      antiairBuff: this.fb.control(100),
      reloadBuff: this.fb.control(100),
      firepowerBuff: this.fb.control(100),
      torpedoBuff: this.fb.control(100),
      aviationBuff: this.fb.control(100),
    });
  }

  private loadForm(): void {
    if (this.ship && this.shipStat) {
      this.shipForm.reset({
        primary: this.getSlotValue(this.ship.slots.primary, this.shipStat),
        secondary: this.getSlotValue(this.ship.slots.secondary, this.shipStat),
        tertiary: this.getSlotValue(this.ship.slots.tertiary, this.shipStat),
        antiair: this.getValue(this.shipStat.antiair),
        reload: this.getValue(this.shipStat.reload),
        firepower: this.getValue(this.shipStat.firepower),
        torpedo: this.getValue(this.shipStat.torpedo),
        aviation: this.getValue(this.shipStat.aviation),
        damageBuff: 0,
        antiairBuff: 0,
        reloadBuff: 0,
        firepowerBuff: 0,
        torpedoBuff: 0,
        aviationBuff: 0,
      });
    } else {
      this.shipForm.reset({
        primary: 0,
        secondary: 0,
        tertiary: 0,
        antiair: 0,
        reload: 0,
        firepower: 0,
        torpedo: 0,
        aviation: 0,
        damageBuff: 0,
        antiairBuff: 0,
        reloadBuff: 0,
        firepowerBuff: 0,
        torpedoBuff: 0,
        aviationBuff: 0,
      });
    }
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.ship = active.ship;
        this.shipStat = active.shipStat;
        this.loadForm();
      });
  }

  private getValue(value?: number): number {
    if (value) {
      return value;
    } else {
      return 0;
    }
  }

  private getPercentage(value?: number): number {
    if (value) {
      return Math.round(value * 100);
    } else {
      return 0;
    }
  }

  private reversePercentage(value?: string): number {
    if (value) {
      return Number(value) / 100;
    } else {
      return 0;
    }
  }

  private reverseValue(value?: string): number {
    if (value) {
      return Number(value);
    } else {
      return 0;
    }
  }

  private setSlots(efficiency: number): IShipSlots {
    if (this.ship && this.gun) {
      return this.getSlots(this.ship, this.gun, efficiency);
    }
    throw new Error('Not a valid state');
  }

  private getSlots(ship: IShip, gun: IGun, efficiency: number): IShipSlots {
    let { primary, secondary, tertiary } = ship.slots;
    if (this.checkSlot(ship.slots.primary, gun)) {
      if (primary.kaiEfficiency) {
        primary.kaiEfficiency = efficiency;
      } else {
        primary.maxEfficiency = efficiency;
      }
    } else if (this.checkSlot(ship.slots.secondary, gun)) {
      if (secondary.kaiEfficiency) {
        secondary.kaiEfficiency = efficiency;
      } else {
        secondary.maxEfficiency = efficiency;
      }
    } else if (this.checkSlot(ship.slots.tertiary, gun)) {
      if (tertiary.kaiEfficiency) {
        tertiary.kaiEfficiency = efficiency;
      } else {
        tertiary.maxEfficiency = efficiency;
      }
    }
    return { primary, secondary, tertiary };
  }

  private checkSlot(slot: IShipSlot, gun: IGun): boolean {
    if (Array.isArray(slot.type)) {
      return slot.type.includes(gun.type);
    }
    return slot.type === gun.type;
  }

  private getEfficiency(slot: IShipSlot): number {
    switch (this.shipStat?.name) {
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

  private getSlot(slot: IShipSlot): string {
    if (Array.isArray(slot.type)) {
      return 'Mixed';
    } else {
      return slot.type;
    }
  }

  private getSlotValue(slot: IShipSlot, shipStat: IShipStat): number {
    let efficiency: number;
    switch (shipStat.name) {
      case 'Level 100':
      case 'Level 120':
        efficiency = slot.maxEfficiency;
        break;
      case 'Level 100 Retrofit':
      case 'Level 120 Retrofit':
        efficiency = slot.kaiEfficiency || slot.maxEfficiency;
        break;
      default:
        efficiency = slot.minEfficiency;
        break;
    }
    return this.getPercentage(efficiency);
  }

  get getSlotPrimary(): string {
    return this.ship ? this.getSlot(this.ship.slots.primary) : 'First Slot';
  }

  get getSlotSecondary(): string {
    return this.ship ? this.getSlot(this.ship.slots.secondary) : 'Second Slot';
  }

  get getSlotThird(): string {
    return this.ship ? this.getSlot(this.ship.slots.tertiary) : 'Third Slot';
  }
}
