import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IShip, IShipSlot } from '@app/models/ship';
import { AppState } from '@app/store';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { selectShipActive } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-nav-bar',
  templateUrl: './ship-nav-bar.component.html',
  styleUrls: ['./ship-nav-bar.component.scss'],
})
export class ShipNavBarComponent implements OnInit, OnDestroy {
  public tabs: string[] = [];

  private ngUnsubscribe = new Subject();
  private ship?: IShip;

  public constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onChange($event: MatTabChangeEvent): void {
    this.store.dispatch(NavigationActions.SetShipSlot({ slot: $event.index }));
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(({ ship }) => {
        this.ship = ship;
        this.tabs = [
          this.getName(ship),
          this.getSlotPrimary(ship),
          this.getSlotSecondary(ship),
          this.getSlotThird(ship),
          'Calculations',
        ];
      });
  }

  private getName(ship?: IShip): string {
    return ship ? `${ship.name} Stats` : 'Ship';
  }

  private getSlot(slot: IShipSlot): string {
    if (Array.isArray(slot.type)) {
      return 'Mixed Slot';
    } else {
      return slot.type;
    }
  }

  private getSlotPrimary(ship?: IShip): string {
    return ship ? this.getSlot(ship.slots.primary) : 'First Slot';
  }

  private getSlotSecondary(ship?: IShip): string {
    return ship ? this.getSlot(ship.slots.secondary) : 'Second Slot';
  }

  private getSlotThird(ship?: IShip): string {
    return ship ? this.getSlot(ship.slots.tertiary) : 'Third Slot';
  }
}
