import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IShipCalculationAdvanced } from '@app/models/shipStore';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { selectShipCalculation } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-calculation-advanced',
  templateUrl: './ship-calculation-advanced-home.component.html',
  styleUrls: ['./ship-calculation-advanced-home.component.scss'],
})
export class ShipCalculationAdvancedHomeComponent implements OnInit, OnDestroy {
  private calculationAdvanced?: IShipCalculationAdvanced;
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
      .select(selectShipCalculation)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((calculation) => {
        if (calculation) {
          this.calculationAdvanced = calculation.shipCalculation.advanced;
        }
      });
  }

  get hasAntiAir(): boolean {
    return !!this.calculationAdvanced?.antiAir;
  }
  get hasPlane(): boolean {
    return !!this.calculationAdvanced?.aviation;
  }
}
