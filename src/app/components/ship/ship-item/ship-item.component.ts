import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEquipment } from '@app/models/equipment';
import { IShip, IShipSlot, IShipSlots, IShipStat } from '@app/models/ship';
import { UtilService } from '@app/services/util.service';
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
  public initialIndex: number = 0;

  private ngUnsubscribe = new Subject();
  private equipment?: IEquipment;

  public constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private equipmentService: UtilService,
    private snackBar: MatSnackBar
  ) {
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
    this.snackBar.open(
      `Updated ${this.ship?.name || 'Ship'} Parameters`,
      'Ok',
      {
        duration: 2000,
      }
    );
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
    if (this.ship && this.equipment && this.shipStat) {
      return this.getSlots(
        this.ship,
        this.equipment,
        efficiency,
        this.shipStat
      );
    }
    throw new Error('Not a valid state');
  }

  private getSlots(
    ship: IShip,
    gun: IEquipment,
    efficiency: number,
    shipStat: IShipStat
  ): IShipSlots {
    let { primary, secondary, tertiary } = ship.slots;
    if (this.equipmentService.checkSlot(ship.slots.primary, gun, shipStat)) {
      if (primary.kaiEfficiency) {
        primary.kaiEfficiency = efficiency;
      } else {
        primary.maxEfficiency = efficiency;
      }
    } else if (
      this.equipmentService.checkSlot(ship.slots.secondary, gun, shipStat)
    ) {
      if (secondary.kaiEfficiency) {
        secondary.kaiEfficiency = efficiency;
      } else {
        secondary.maxEfficiency = efficiency;
      }
    } else if (
      this.equipmentService.checkSlot(ship.slots.tertiary, gun, shipStat)
    ) {
      if (tertiary.kaiEfficiency) {
        tertiary.kaiEfficiency = efficiency;
      } else {
        tertiary.maxEfficiency = efficiency;
      }
    }
    return { primary, secondary, tertiary };
  }

  private getSlot(slot: IShipSlot, shipStat: IShipStat): string {
    const type = this.equipmentService.getType(slot, shipStat);
    if (Array.isArray(type)) {
      return 'Mixed';
    } else {
      return type;
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
    return this.ship && this.shipStat
      ? this.getSlot(this.ship.slots.primary, this.shipStat)
      : 'First Slot';
  }

  get getSlotSecondary(): string {
    return this.ship && this.shipStat
      ? this.getSlot(this.ship.slots.secondary, this.shipStat)
      : 'Second Slot';
  }

  get getSlotThird(): string {
    return this.ship && this.shipStat
      ? this.getSlot(this.ship.slots.tertiary, this.shipStat)
      : 'Third Slot';
  }
}
