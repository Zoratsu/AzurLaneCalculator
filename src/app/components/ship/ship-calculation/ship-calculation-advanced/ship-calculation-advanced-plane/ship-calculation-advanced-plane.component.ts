import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IShipCalculationSlot } from '@app/models/shipStore';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { selectShipCalculation } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-calculation-advanced-plane',
  templateUrl: './ship-calculation-advanced-plane.component.html',
  styleUrls: ['./ship-calculation-advanced-plane.component.scss'],
})
export class ShipCalculationAdvancedPlaneComponent
  implements OnInit, OnDestroy {
  public calculationForm: FormGroup;

  private ngUnsubscribe = new Subject();
  private calculation?: IShipCalculationSlot;

  public constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private utilService: UtilService
  ) {
    this.calculationForm = this.buildForm();
  }

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      cooldown: this.fb.control(0),
      raw: this.fb.control(0),
      light: this.fb.control(0),
      medium: this.fb.control(0),
      heavy: this.fb.control(0),
    });
  }

  private loadForm(): void {
    this.calculationForm.reset({
      cooldown: this.utilService.getValue(this.calculation?.cooldown),
      raw: this.utilService.getValue(this.calculation?.raw),
      light: this.utilService.getValue(this.calculation?.light),
      medium: this.utilService.getValue(this.calculation?.medium),
      heavy: this.utilService.getValue(this.calculation?.heavy),
    });
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipCalculation)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((calculation) => {
        if (calculation) {
          this.calculation = calculation.shipCalculation.advanced?.aviation;
          this.loadForm();
        }
      });
  }
}
