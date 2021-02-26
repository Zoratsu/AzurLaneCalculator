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
  selector: 'app-torpedo-home',
  templateUrl: './torpedo-home.component.html',
  styleUrls: ['./torpedo-home.component.scss'],
})
export class TorpedoHomeComponent implements OnInit, OnDestroy {
  public isTorpedoActive: boolean = false;
  public isTorpedoCalculationActive: boolean = false;

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
        this.isTorpedoActive = active;
        if (active) {
          this.store.dispatch(EquipmentActions.ProcessActive());
        }
      });
    this.store
      .select(selectEquipmentCalculationIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isActive) => (this.isTorpedoCalculationActive = isActive));
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => (this.active = active));
  }

  get getTitle(): string {
    return `${this.active?.equipment?.name} | ${this.active?.tier?.rarity} ${this.active?.tier?.stars}`;
  }
}
