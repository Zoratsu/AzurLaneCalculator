import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipmentType } from '@app/models/equipment';
import { AppState } from '@app/store';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import { ShipActions } from '@app/store/actions/ship.actions';
import { IEquipmentActive } from '@app/store/reducers/equipment.reducer';
import {
  selectEquipmentActive,
  selectEquipmentArray,
  selectEquipmentIsActive,
} from '@app/store/selectors/equipment.selector';
import { selectNavigationSelectedEquipmentType } from '@app/store/selectors/navigation.selector';
import { selectShipActiveSlotSelected } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-slot-gun',
  templateUrl: './ship-slot-gun.component.html',
  styleUrls: ['./ship-slot-gun.component.scss'],
})
export class ShipSlotGunComponent implements OnInit, OnDestroy {
  public isGunActive: boolean = false;
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

  public equipGun(): void {
    this.store.dispatch(ShipActions.EquipEquipment());
    this.snackBar.open(`Equipping ${this.active?.equipment?.name}`, 'Ok', {
      duration: 2000,
    });
  }

  private loadSubscription() {
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
        this.isGunActive = isActive;
      });
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.active = active;
      });
  }

  get slotName() {
    return this.equipmentType;
  }

  get getTitle(): string {
    return `${this.active?.equipment?.name} | ${this.active?.tier?.rarity} ${this.active?.tier?.stars}`;
  }
}
