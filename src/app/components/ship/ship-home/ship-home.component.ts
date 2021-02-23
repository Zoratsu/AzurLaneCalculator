import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { ShipActions } from '@app/store/actions/ship.actions';
import {
  selectGunCalculationIsActive,
  selectGunIsActive,
} from '@app/store/selectors/gun.selector';
import {
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
  public isShipActive: boolean = false;
  public isShipCalculationActive: boolean = false;

  private ngUnsubscribe = new Subject();

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
      .select(selectShipIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.isShipActive = active;
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
  }
}
