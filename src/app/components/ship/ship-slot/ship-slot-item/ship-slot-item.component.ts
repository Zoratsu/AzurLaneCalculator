import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import {
  selectNavigationEquipmentTypeIsAntiAirGun,
  selectNavigationEquipmentTypeIsGun,
  selectNavigationEquipmentTypeIsMixed,
  selectNavigationEquipmentTypeIsPlane,
  selectNavigationEquipmentTypeIsTorpedo,
} from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-slot-item',
  templateUrl: './ship-slot-item.component.html',
  styleUrls: ['./ship-slot-item.component.scss'],
})
export class ShipSlotItemComponent implements OnInit, OnDestroy {
  public isGun = false;
  public isTorpedo = false;
  public isAntiAir = false;
  public isPlane = false;
  public isMixed = false;

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
      .select(selectNavigationEquipmentTypeIsGun)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isGun) => (this.isGun = isGun));
    this.store
      .select(selectNavigationEquipmentTypeIsTorpedo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isTorpedo) => (this.isTorpedo = isTorpedo));
    this.store
      .select(selectNavigationEquipmentTypeIsAntiAirGun)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isAntiAir) => (this.isAntiAir = isAntiAir));
    this.store
      .select(selectNavigationEquipmentTypeIsPlane)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isPlane) => (this.isPlane = isPlane));
    this.store
      .select(selectNavigationEquipmentTypeIsMixed)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isMixed) => (this.isMixed = isMixed));
  }
}
