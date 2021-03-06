import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import {
  selectNavigationEquipmentTypeIsAntiAirGun,
  selectNavigationEquipmentTypeIsGun,
  selectNavigationEquipmentTypeIsPlane,
  selectNavigationEquipmentTypeIsTorpedo,
} from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-equipment-home',
  templateUrl: './equipment-home.component.html',
  styleUrls: ['./equipment-home.component.scss'],
})
export class EquipmentHomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  private gun = false;
  private torpedo = false;
  private antiAir = false;
  private plane = false;

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
      .subscribe((isGun) => (this.gun = isGun));
    this.store
      .select(selectNavigationEquipmentTypeIsTorpedo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isTorpedo) => (this.torpedo = isTorpedo));
    this.store
      .select(selectNavigationEquipmentTypeIsAntiAirGun)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isAntiAirGun) => (this.antiAir = isAntiAirGun));
    this.store
      .select(selectNavigationEquipmentTypeIsPlane)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isPlane) => (this.plane = isPlane));
  }

  get isGun(): boolean {
    return this.gun;
  }

  get isTorpedo(): boolean {
    return this.torpedo;
  }

  get isAntiAir(): boolean {
    return this.antiAir;
  }
  get isPlane(): boolean {
    return this.plane;
  }
}
