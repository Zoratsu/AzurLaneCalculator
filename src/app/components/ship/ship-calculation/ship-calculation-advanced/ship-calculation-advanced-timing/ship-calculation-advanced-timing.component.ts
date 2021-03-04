import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { selectShipCalculation } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-calculation-advanced-timing',
  templateUrl: './ship-calculation-advanced-timing.component.html',
  styleUrls: ['./ship-calculation-advanced-timing.component.scss'],
})
export class ShipCalculationAdvancedTimingComponent
  implements OnInit, OnDestroy {
  public bbSync?: number[];
  public cvSync?: number[];

  private ngUnsubscribe = new Subject();

  public constructor(
    private store: Store<AppState>,
    private utilService: UtilService
  ) {}

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public parser(value: number): number {
    return this.utilService.getValue(value);
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipCalculation)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((calculation) => {
        if (calculation) {
          this.bbSync = calculation.shipCalculation.advanced?.shellingTiming;
          this.cvSync = calculation.shipCalculation.advanced?.aviationTiming;
        }
      });
  }
}
