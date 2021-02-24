import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipmentType } from '@app/models/equipment';
import { IGun, IGunTier } from '@app/models/gun';
import { AppState } from '@app/store';
import { ShipActions } from '@app/store/actions/ship.actions';
import { IGunActive } from '@app/store/reducers/gun.reducer';
import {
  selectGunActive,
  selectGunIsActive,
} from '@app/store/selectors/gun.selector';
import { selectNavigationSelectedEquipmentType } from '@app/store/selectors/navigation.selector';
import { selectShipActiveSlots } from '@app/store/selectors/ship.selector';
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
  public active?: IGunActive;

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
    this.store.dispatch(ShipActions.EquipGun());
    this.snackBar.open(`Equipping ${this.active?.gun?.name}`, 'Ok', {
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
      .select(selectGunIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isActive) => {
        this.isGunActive = isActive;
      });
    this.store
      .select(selectGunActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.active = active;
      });
    this.store
      .select(selectShipActiveSlots)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((slots) => console.log(slots));
  }

  get slotName() {
    return this.equipmentType;
  }

  get getTitle(): string {
    return `${this.active?.gun?.name} | ${this.active?.tier?.rarity} ${this.active?.tier?.stars}`;
  }
}
