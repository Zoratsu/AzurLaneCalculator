import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IShip, IShipBuff, IShipSlot, IShipStat } from '@app/models/ship';
import { IShipSlotsEfficiencies } from '@app/models/shipStore';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { ShipActions } from '@app/store/actions/ship.actions';
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
  public shipSlotsEfficiencies?: IShipSlotsEfficiencies;
  public shipForm: FormGroup;
  public initialIndex: number = 0;

  private ngUnsubscribe = new Subject();

  public constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private utilService: UtilService,
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
      const form = this.shipForm.getRawValue();
      let shipBuff: IShipBuff = {
        damage: this.utilService.reversePercentage(form.damageBuff),
        antiair: this.utilService.reversePercentage(form.antiairBuff),
        reload: this.utilService.reversePercentage(form.reloadBuff),
        firepower: this.utilService.reversePercentage(form.firepowerBuff),
        torpedo: this.utilService.reversePercentage(form.torpedoBuff),
        aviation: this.utilService.reversePercentage(form.aviationBuff),
      };
      let shipStat: IShipStat = {
        ...this.shipStat,
        antiair: this.utilService.reversePercentage(form.antiair),
        reload: this.utilService.reversePercentage(form.reload),
        firepower: this.utilService.reversePercentage(form.firepower),
        torpedo: this.utilService.reversePercentage(form.torpedo),
        aviation: this.utilService.reversePercentage(form.aviation),
      };
      let shipSlotsEfficiencies: IShipSlotsEfficiencies = {
        primary: this.utilService.reversePercentage(form.primary),
        secondary: this.utilService.reversePercentage(form.secondary),
        tertiary: this.utilService.reversePercentage(form.tertiary),
      };
      this.store.dispatch(ShipActions.SetActiveShipStat({ shipStat }));
      this.store.dispatch(
        ShipActions.SetActiveShipSlotEfficiencies({ shipSlotsEfficiencies })
      );
      this.store.dispatch(ShipActions.SetActiveShipBuff({ shipBuff }));
    }
    this.store.dispatch(ShipActions.ProcessActive());
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
    if (this.ship && this.shipStat && this.shipSlotsEfficiencies) {
      this.shipForm.reset({
        primary: this.utilService.getPercentage(
          this.shipSlotsEfficiencies.primary
        ),
        secondary: this.utilService.getPercentage(
          this.shipSlotsEfficiencies.secondary
        ),
        tertiary: this.utilService.getPercentage(
          this.shipSlotsEfficiencies.tertiary
        ),
        antiair: this.utilService.getValue(this.shipStat.antiair),
        reload: this.utilService.getValue(this.shipStat.reload),
        firepower: this.utilService.getValue(this.shipStat.firepower),
        torpedo: this.utilService.getValue(this.shipStat.torpedo),
        aviation: this.utilService.getValue(this.shipStat.aviation),
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
        this.shipSlotsEfficiencies = active.shipSlotsEfficiencies;
        this.loadForm();
      });
  }

  private getSlot(slot: IShipSlot, shipStat: IShipStat): string {
    const type = this.utilService.getType(slot, shipStat);
    if (Array.isArray(type)) {
      return 'Mixed';
    } else {
      return type;
    }
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
