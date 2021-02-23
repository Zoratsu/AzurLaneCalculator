import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShipSlotNavigation } from '@app/models/navigation';
import { IShip, IShipStat } from '@app/models/ship';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { ShipActions } from '@app/store/actions/ship.actions';
import {
  selectGunCalculationIsActive,
  selectGunIsActive,
} from '@app/store/selectors/gun.selector';
import { selectNavigationSlot } from '@app/store/selectors/navigation.selector';
import {
  selectShipActive,
  selectShipCalculationIsActive,
  selectShipIsActive,
} from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home-ship',
  templateUrl: './ship-home.component.html',
  styleUrls: ['./ship-home.component.scss'],
})
export class ShipHomeComponent implements OnInit, OnDestroy {
  public isGunActive: boolean = false;
  public isGunCalculationActive: boolean = false;
  public shipActive?: {
    ship: IShip | undefined;
    shipStat: IShipStat | undefined;
  };
  public isShipCalculationActive: boolean = false;

  private ngUnsubscribe = new Subject();
  private slot: ShipSlotNavigation = ShipSlotNavigation.ship;

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipIsActive, selectGunIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        if (active) {
          this.store.dispatch(ShipActions.ProcessActive());
        }
      });
    this.store
      .select(selectShipActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.shipActive = active;
      });
    this.store
      .select(selectGunIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.isGunActive = active;
        if (active) {
          this.store.dispatch(GunActions.ProcessActive());
        }
      });
    this.store
      .select(selectGunCalculationIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isActive) => (this.isGunCalculationActive = isActive));
    this.store
      .select(selectShipCalculationIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isActive) => (this.isShipCalculationActive = isActive));
    this.store
      .select(selectNavigationSlot)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((slot) => (this.slot = slot));
  }

  get isShip() {
    return this.slot === ShipSlotNavigation.ship;
  }

  get isPrimary() {
    return this.slot === ShipSlotNavigation.primary;
  }

  get isSecondary() {
    return this.slot === ShipSlotNavigation.secondary;
  }

  get isTertiary() {
    return this.slot === ShipSlotNavigation.tertiary;
  }
  get isCalculations() {
    return this.slot === ShipSlotNavigation.calculation;
  }

  get isShipActive() {
    return this.shipActive?.ship && this.shipActive?.shipStat;
  }
}
