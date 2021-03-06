import { Component, OnDestroy, OnInit } from '@angular/core';
import { IEquipmentActive } from '@app/models/equipmentStore';
import { AppState } from '@app/store';
import {
  selectEquipmentActive,
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
  public isGunActive = false;

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
        this.isGunActive = active;
      });
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => (this.active = active));
  }

  get title(): string {
    return `${this.active?.equipment?.name} | ${this.active?.tier?.rarity} ${this.active?.tier?.stars}`;
  }

  get subtitle(): string {
    return `${this.active?.equipment?.id}`;
  }
  get image(): string | undefined {
    return this.active?.equipment?.image;
  }
}
