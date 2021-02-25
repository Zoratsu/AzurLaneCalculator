import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import { IEquipmentActive } from '@app/store/reducers/equipment.reducer';
import {
  selectEquipmentActive,
  selectEquipmentCalculationIsActive,
  selectEquipmentIsActive,
} from '@app/store/selectors/equipment.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gun-home',
  templateUrl: './gun-home.component.html',
  styleUrls: ['./gun-home.component.scss'],
})
export class GunHomeComponent implements OnInit, OnDestroy {
  public isGunActive: boolean = false;
  public isGunCalculationActive: boolean = false;

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
        this.isGunActive = active;
        if (active) {
          this.store.dispatch(EquipmentActions.ProcessActive());
        }
      });
    this.store
      .select(selectEquipmentCalculationIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isActive) => (this.isGunCalculationActive = isActive));
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => (this.active = active));
  }

  get getTitle(): string {
    return `${this.active?.equipment?.name} | ${this.active?.tier?.rarity} ${this.active?.tier?.stars}`;
  }
}
