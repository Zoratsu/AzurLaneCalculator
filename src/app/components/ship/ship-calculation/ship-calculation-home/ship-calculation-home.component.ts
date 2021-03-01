import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SlotID } from '@app/models/ship';
import { AppState } from '@app/store';
import {
  selectShipCalculation,
  selectShipCalculationIsAdvanced,
} from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-calculation-home',
  templateUrl: './ship-calculation-home.component.html',
  styleUrls: ['./ship-calculation-home.component.scss'],
})
export class ShipCalculationHomeComponent implements OnInit, OnDestroy {
  public isAdvanced: boolean = false;
  public index: number = 0;

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
      .select(selectShipCalculationIsAdvanced)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isAdvanced) => (this.isAdvanced = isAdvanced));
  }

  get primary() {
    return SlotID.primary;
  }

  get secondary() {
    return SlotID.secondary;
  }

  get tertiary() {
    return SlotID.tertiary;
  }
}
