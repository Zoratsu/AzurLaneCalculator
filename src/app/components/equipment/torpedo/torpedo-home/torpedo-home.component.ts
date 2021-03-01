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

  private ngUnsubscribe = new Subject();
  private active?: IEquipmentActive;

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
      });
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.active = active;
      });
  }

  get title(): string {
    return `${this.active?.equipment?.name} | ${this.active?.tier?.rarity} ${this.active?.tier?.stars}`;
  }
  get image(): string | undefined {
    return this.active?.equipment?.image;
  }
}
