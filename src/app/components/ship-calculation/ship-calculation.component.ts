import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IGunCalculation } from '@app/models/gun';
import { AppState } from '@app/store';
import { selectShipCalculation } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-calculation',
  templateUrl: './ship-calculation.component.html',
  styleUrls: ['./ship-calculation.component.scss'],
})
export class ShipCalculationComponent implements OnInit {
  public calculation?: IGunCalculation;
  public calculationForm: FormGroup;
  private ngUnsubscribe = new Subject();

  public constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.calculationForm = this.buildForm();
  }

  public ngOnInit(): void {
    this.loadSubscription();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      cooldown: this.fb.control('0'),
      raw: this.fb.control('0'),
      light: this.fb.control('0'),
      medium: this.fb.control('0'),
      heavy: this.fb.control('0'),
    });
  }

  private loadForm(): void {
    this.calculationForm.reset({
      cooldown: this.getSecond(this.calculation?.cooldown),
      raw: this.getValue(this.calculation?.raw),
      light: this.getValue(this.calculation?.light),
      medium: this.getValue(this.calculation?.medium),
      heavy: this.getValue(this.calculation?.heavy),
    });
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipCalculation)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((calculation) => {
        this.calculation = calculation;
        this.loadForm();
      });
  }

  private getValue(value?: number) {
    if (value) {
      return `${Math.round(value * 100) / 100}`;
    } else {
      return '0';
    }
  }

  private getSecond(value?: number) {
    if (value) {
      return `${Math.round(value * 100) / 100}`;
    } else {
      return '0';
    }
  }
}
