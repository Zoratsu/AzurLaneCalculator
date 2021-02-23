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
import { ShipActions } from '@app/store/actions/ship.actions';
import { selectGunActive } from '@app/store/selectors/gun.selector';
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
    this.store.dispatch(ShipActions.ProcessActive());
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      firepower: this.fb.control('100'),
      reload: this.fb.control('100'),
      efficiency: this.fb.control('100'),
      damageBuff: this.fb.control('0'),
      reloadBuff: this.fb.control('0'),
      firepowerBuff: this.fb.control('0'),
    });
  }

  private loadForm(): void {
    let efficiency = 0;
    if (this.ship && this.gun) {
      const slot = this.getSlot(this.ship, this.gun);
      efficiency = this.getEfficiency(slot);
    }
    this.shipForm.reset({
      firepower: this.shipStat?.firepower,
      reload: this.shipStat?.reload,
      efficiency: efficiency,
      damageBuff: this.getPercentage(this.ship?.buff.damage),
      reloadBuff: this.getPercentage(this.ship?.buff.reload),
      firepowerBuff: this.getPercentage(this.ship?.buff.firepower),
    });
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
    this.store
      .select(selectGunActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.gun = active.gun;
        this.loadForm();
      });
  }

  private getPercentage(value?: number): string {
    if (value) {
      return `${Math.round(value * 100)}`;
    } else {
      return '0';
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

  private getSlot(ship: IShip, gun: IGun): IShipSlot {
    if (this.checkSlot(ship.slots.primary, gun)) {
      return ship.slots.primary;
    }
    if (this.checkSlot(ship.slots.secondary, gun)) {
      return ship.slots.secondary;
    }
    if (this.checkSlot(ship.slots.tertiary, gun)) {
      return ship.slots.tertiary;
    }
    throw new Error('Not a valid GUN for SHIP');
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
}
