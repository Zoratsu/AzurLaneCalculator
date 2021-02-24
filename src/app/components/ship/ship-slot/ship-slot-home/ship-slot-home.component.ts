import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShipSlotNavigation } from '@app/models/navigation';
import { AppState } from '@app/store';
import { selectNavigationSlot } from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-slot-home',
  templateUrl: './ship-slot-home.component.html',
  styleUrls: ['./ship-slot-home.component.scss'],
})
export class ShipSlotHomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  private slot: ShipSlotNavigation = ShipSlotNavigation.ship;

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
      .select(selectNavigationSlot)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((slot) => (this.slot = slot));
  }

  get isPrimary() {
    return this.slot === ShipSlotNavigation.primary;
  }

  get isSecondary() {
    return this.slot === ShipSlotNavigation.secondary;
  }

  get isTertiary() {
    return this.slot === ShipSlotNavigation.tertiary;
  }
}
