import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public shipBuff?: IShipBuff;
  public shipSlotsEfficiencies?: IShipSlotsEfficiencies;
  public shipForm: FormGroup;
  public initialIndex = 0;

  private ngUnsubscribe = new Subject();

  public constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private utilService: UtilService
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
      const shipBuff: IShipBuff = {
        damage: this.utilService.reversePercentage(form.damageBuff),
        antiAir: this.utilService.reversePercentage(form.antiairBuff),
        reload: this.utilService.reversePercentage(form.reloadBuff),
        firepower: this.utilService.reversePercentage(form.firepowerBuff),
        torpedo: this.utilService.reversePercentage(form.torpedoBuff),
        aviation: this.utilService.reversePercentage(form.aviationBuff),
        initialStrike: this.utilService.reversePercentage(form.initialStrike),
        allStrike: this.utilService.reversePercentage(form.allStrike),
      };
      const shipStat: IShipStat = {
        ...this.shipStat,
        antiAir: this.utilService.reverseValue(form.antiair),
        reload: this.utilService.reverseValue(form.reload),
        firepower: this.utilService.reverseValue(form.firepower),
        torpedo: this.utilService.reverseValue(form.torpedo),
        aviation: this.utilService.reverseValue(form.aviation),
      };
      const shipSlotsEfficiencies: IShipSlotsEfficiencies = {
        primary: this.utilService.reversePercentage(form.primary),
        primaryMount: this.utilService.reverseValue(form.primaryMount),
        secondary: this.utilService.reversePercentage(form.secondary),
        secondaryMount: this.utilService.reverseValue(form.secondaryMount),
        tertiary: this.utilService.reversePercentage(form.tertiary),
        tertiaryMount: this.utilService.reverseValue(form.tertiaryMount),
      };
      this.store.dispatch(ShipActions.SetActiveShipStat({ shipStat }));
      this.store.dispatch(
        ShipActions.SetActiveShipSlotEfficiencies({ shipSlotsEfficiencies })
      );
      this.store.dispatch(ShipActions.SetActiveShipBuff({ shipBuff }));
    }
    this.utilService.createSnack(
      `Updated ${this.ship?.name || 'Ship'} Parameters`,
      'Ok'
    );
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      primary: this.fb.control(100, Validators.required),
      primaryMount: this.fb.control(1, Validators.required),
      secondary: this.fb.control(100, Validators.required),
      secondaryMount: this.fb.control(1, Validators.required),
      tertiary: this.fb.control(100, Validators.required),
      tertiaryMount: this.fb.control(1, Validators.required),
      antiair: this.fb.control(100, Validators.required),
      reload: this.fb.control(100, Validators.required),
      firepower: this.fb.control(100, Validators.required),
      torpedo: this.fb.control(100, Validators.required),
      aviation: this.fb.control(100, Validators.required),
      damageBuff: this.fb.control(100, Validators.required),
      antiairBuff: this.fb.control(100, Validators.required),
      reloadBuff: this.fb.control(100, Validators.required),
      firepowerBuff: this.fb.control(100, Validators.required),
      torpedoBuff: this.fb.control(100, Validators.required),
      aviationBuff: this.fb.control(100, Validators.required),
      initialStrike: this.fb.control(0, Validators.required),
      allStrike: this.fb.control(0, Validators.required),
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
        primaryMount: this.utilService.getValue(
          this.shipSlotsEfficiencies.primaryMount
        ),
        secondaryMount: this.utilService.getValue(
          this.shipSlotsEfficiencies.secondaryMount
        ),
        tertiaryMount: this.utilService.getValue(
          this.shipSlotsEfficiencies.tertiaryMount
        ),
        antiair: this.utilService.getValue(this.shipStat.antiAir),
        reload: this.utilService.getValue(this.shipStat.reload),
        firepower: this.utilService.getValue(this.shipStat.firepower),
        torpedo: this.utilService.getValue(this.shipStat.torpedo),
        aviation: this.utilService.getValue(this.shipStat.aviation),
        damageBuff: this.utilService.getPercentage(this.shipBuff?.damage),
        antiairBuff: this.utilService.getPercentage(this.shipBuff?.antiAir),
        reloadBuff: this.utilService.getPercentage(this.shipBuff?.reload),
        firepowerBuff: this.utilService.getPercentage(this.shipBuff?.firepower),
        torpedoBuff: this.utilService.getPercentage(this.shipBuff?.torpedo),
        aviationBuff: this.utilService.getPercentage(this.shipBuff?.aviation),
        initialStrike: this.utilService.getPercentage(
          this.shipBuff?.initialStrike
        ),
        allStrike: this.utilService.getPercentage(this.shipBuff?.allStrike),
      });
    } else {
      this.shipForm.reset({
        primary: 0,
        secondary: 0,
        tertiary: 0,
        primaryMount: 0,
        secondaryMount: 0,
        tertiaryMount: 0,
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
        initialStrike: 0,
        allStrike: 0,
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
        this.shipBuff = active.shipBuff;
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
