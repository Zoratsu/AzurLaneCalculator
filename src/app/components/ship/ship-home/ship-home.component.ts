import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShipSlotNavigation } from '@app/models/navigation';
import { IShip, IShipStat } from '@app/models/ship';
import { AppState } from '@app/store';
import {
  selectNavigationEquipmentTypeIsGun,
  selectNavigationShipSlot,
} from '@app/store/selectors/navigation.selector';
import { selectShipActive } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home-ship',
  templateUrl: './ship-home.component.html',
  styleUrls: ['./ship-home.component.scss'],
})
export class ShipHomeComponent implements OnInit, OnDestroy {
  public isGun: boolean = false;

  private ngUnsubscribe = new Subject();
  private slot: ShipSlotNavigation = ShipSlotNavigation.ship;
  private active?: {
    ship?: IShip;
    shipStat?: IShipStat;
  };

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
      .select(selectShipActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.active = active;
      });
    this.store
      .select(selectNavigationShipSlot)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((slot) => (this.slot = slot));
    this.store
      .select(selectNavigationEquipmentTypeIsGun)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isGun) => (this.isGun = isGun));
  }

  get shipImage() {
    return this.active?.ship?.image;
  }

  get isShip() {
    return this.slot === ShipSlotNavigation.ship;
  }

  get isCalculations() {
    return this.slot === ShipSlotNavigation.calculation;
  }

  get isShipActive() {
    return this.active?.ship && this.active?.shipStat;
  }

  get getTitle(): string {
    return `${this.active?.ship?.name} | ${this.active?.shipStat?.name}`;
  }
}
