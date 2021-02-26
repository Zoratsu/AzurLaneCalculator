import { Component, OnDestroy, OnInit } from '@angular/core';
import { IEquipmentActive } from '@app/models/equipmentStore';
import { AppState } from '@app/store';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import {
  selectEquipmentActive,
  selectEquipmentCalculationIsActive,
  selectEquipmentIsActive,
} from '@app/store/selectors/equipment.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-anti-air-home',
  templateUrl: './anti-air-home.component.html',
  styleUrls: ['./anti-air-home.component.scss'],
})
export class AntiAirHomeComponent implements OnInit, OnDestroy {
  public isAntiAirActive: boolean = false;
  public isAntiAirCalculationActive: boolean = false;

  public active?: IEquipmentActive;

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
      .select(selectEquipmentIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.isAntiAirActive = active;
        if (active) {
          this.store.dispatch(EquipmentActions.ProcessActive());
        }
      });
    this.store
      .select(selectEquipmentCalculationIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isActive) => (this.isAntiAirCalculationActive = isActive));
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => (this.active = active));
  }

  get getTitle(): string {
    return `${this.active?.equipment?.name} | ${this.active?.tier?.rarity} ${this.active?.tier?.stars}`;
  }
}
