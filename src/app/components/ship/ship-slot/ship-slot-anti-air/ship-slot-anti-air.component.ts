import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipmentType } from '@app/models/equipment';
import { IEquipmentActive } from '@app/models/equipmentStore';
import { AppState } from '@app/store';
import { ShipActions } from '@app/store/actions/ship.actions';
import {
  selectEquipmentActive,
  selectEquipmentIsActive,
} from '@app/store/selectors/equipment.selector';
import { selectNavigationSelectedEquipmentType } from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-slot-anti-air',
  templateUrl: './ship-slot-anti-air.component.html',
  styleUrls: ['./ship-slot-anti-air.component.scss'],
})
export class ShipSlotAntiAirComponent implements OnInit, OnDestroy {
  public isAntiAirActive = false;
  public active?: IEquipmentActive;

  private ngUnsubscribe = new Subject();
  private equipmentType?: EquipmentType;

  public constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public equip(): void {
    this.store.dispatch(ShipActions.EquipEquipment());
    this.snackBar.open(`Equipping ${this.active?.equipment?.name}`, 'Ok', {
      duration: 2000,
    });
  }

  private loadSubscription(): void {
    this.store
      .select(selectNavigationSelectedEquipmentType)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((equipmentType) => {
        this.equipmentType = equipmentType;
      });
    this.store
      .select(selectEquipmentIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isActive) => {
        this.isAntiAirActive = isActive;
      });
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.active = active;
      });
  }

  get slotName(): EquipmentType | undefined {
    return this.equipmentType;
  }

  get getTitle(): string {
    return `${this.active?.equipment?.name} | ${this.active?.tier?.rarity} ${this.active?.tier?.stars}`;
  }

  get getImage(): string | undefined {
    return this.active?.equipment?.image;
  }
}
